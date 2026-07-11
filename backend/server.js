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

app.post("/api/checkout/session", async (req, res) => {
  if (!stripe) {
    return res.status(500).json({ error: "Stripe is not configured on the server." });
  }

  const { creatorId, serviceId } = req.body ?? {};
  if (typeof creatorId !== "string" || typeof serviceId !== "string") {
    return res.status(400).json({ error: "A creator and service are required." });
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
            description: service.description,
          },
          unit_amount: unitAmount,
        },
        quantity: 1,
      }],
      metadata: { creatorId, serviceId },
      success_url: `${clientUrl}/app?checkout=success`,
      cancel_url: `${clientUrl}/app?checkout=cancelled`,
    });

    return res.json({ url: session.url });
  } catch (error) {
    console.error("Unable to create Stripe Checkout session", error);
    return res.status(500).json({ error: "Unable to start checkout. Please try again." });
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
