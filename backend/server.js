import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import { readFile } from "node:fs/promises";

dotenv.config();
const app = express();
app.use(express.json());

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;
const seedProfilesPath = new URL("../frontend/src/mocks/seedProfiles.json", import.meta.url);

function getSessionEndTime(startTime, durationMinutes) {
  const match = /^(\d{1,2}):(\d{2}) (AM|PM)$/.exec(startTime);
  if (!match) return startTime;
  const [, hourText, minuteText, period] = match;
  let hours = Number(hourText) % 12;
  if (period === "PM") hours += 12;
  const endMinutes = (hours * 60) + Number(minuteText) + durationMinutes;
  const endHour = Math.floor(endMinutes / 60) % 24;
  return `${endHour % 12 || 12}:${String(endMinutes % 60).padStart(2, "0")} ${endHour >= 12 ? "PM" : "AM"}`;
}

app.post("/api/checkout/session", async (req, res) => {
  if (!stripe) {
    return res.status(500).json({ error: "Stripe is not configured on the server." });
  }

  const { creatorId, serviceId, bookingDate, bookingTime, quantity } = req.body ?? {};
  if (typeof creatorId !== "string" || typeof serviceId !== "string" || typeof bookingDate !== "string" || typeof bookingTime !== "string" || !Number.isInteger(quantity) || quantity < 1 || quantity > 8) {
    return res.status(400).json({ error: "A creator, service, date, and time are required." });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(bookingDate) || !/^(11:00 AM|1:00 PM|3:00 PM|5:00 PM|7:00 PM)$/.test(bookingTime)) {
    return res.status(400).json({ error: "Please choose an available booking date and time." });
  }

  try {
    // Look up price information on the server so a browser cannot change the amount.
    const creators = JSON.parse(await readFile(seedProfilesPath, "utf8"));
    const creator = creators.find((profile) => profile.id === creatorId);
    const service = creator?.services?.find((item) => item.id === serviceId);
    const unitAmount = Math.round(Number(service?.price) * 100);

    if (!service || !["session", "minute"].includes(service.type) || !Number.isSafeInteger(unitAmount) || unitAmount < 1) {
      return res.status(400).json({ error: "That service is unavailable for checkout." });
    }

    const clientUrl = (process.env.CLIENT_URL || "http://localhost:5173").replace(/\/$/, "");
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "book",
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: {
            name: `${creator.userDisplayName}: ${service.name}`,
            description: `${quantity} ${quantity === 1 ? "session" : "sessions"} · ${Number(service.durationMin ?? 0) * quantity} min · ${bookingDate}, ${bookingTime}–${getSessionEndTime(bookingTime, Number(service.durationMin ?? 0) * quantity)}`,
          },
          unit_amount: unitAmount,
        },
        quantity,
      }],
      metadata: { creatorId, serviceId, bookingDate, bookingTime, quantity: String(quantity) },
      success_url: `${clientUrl}/booking/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${clientUrl}/app?checkout=cancelled`,
    });

    return res.json({ url: session.url });
  } catch (error) {
    console.error("Unable to create Stripe Checkout session", error);
    return res.status(500).json({ error: "Unable to start checkout. Please try again." });
  }
});

app.get("/api/checkout/session/:sessionId", async (req, res) => {
  if (!stripe) {
    return res.status(500).json({ error: "Stripe is not configured on the server." });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);
    if (session.payment_status !== "paid") {
      return res.status(409).json({ error: "Your payment is still being processed." });
    }

    const creators = JSON.parse(await readFile(seedProfilesPath, "utf8"));
    const creator = creators.find((profile) => profile.id === session.metadata?.creatorId);
    const service = creator?.services?.find((item) => item.id === session.metadata?.serviceId);

    return res.json({
      paid: true,
      booking: {
        creatorName: creator?.userDisplayName ?? "Your creator",
        serviceName: service?.name ?? "Session",
        amountTotal: session.amount_total ?? 0,
        currency: session.currency ?? "usd",
        sessionId: session.id,
        bookingDate: session.metadata?.bookingDate ?? "",
        bookingTime: session.metadata?.bookingTime ?? "",
        quantity: Number(session.metadata?.quantity ?? 1),
        totalDuration: Number(service?.durationMin ?? 0) * Number(session.metadata?.quantity ?? 1),
        endTime: getSessionEndTime(session.metadata?.bookingTime ?? "", Number(service?.durationMin ?? 0) * Number(session.metadata?.quantity ?? 1)),
      },
    });
  } catch (error) {
    console.error("Unable to retrieve Stripe Checkout session", error);
    return res.status(404).json({ error: "We couldn't find that payment confirmation." });
  }
});

app.get("/", (req, res) => {
  res.send("API is running...");
});
app.get("/user", (req, res) => {
  res.send("User route");
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

server.ref();
server.on("error", (error) => {
  console.error("Server failed to start", error);
  process.exitCode = 1;
});
