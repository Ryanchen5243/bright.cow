import express from "express";
import { generateSecret, generateURI, verify } from "otplib";
import QRCode from "qrcode";

const router = express.Router();

router.get("/setup", async (req, res) => {
    try {
        const secret = generateSecret();

        const uri = generateURI({
            issuer: "Konevo",
            label: req.user.email,
            secret: secret
        });

        const qrCode = await QRCode.toDataURL(uri);

        res.json({
            qrCode,
            secret
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to create 2FA setup" });
    }
});

router.post("/verify", async (req, res) => {
    try {
        const { token, secret } = req.body;

        const result = await verify({
            secret,
            token
        });

        if (!result.valid) {
            return res.status(400).json({
                valid: false,
                error: "Invalid authentication code"
            });
        }

        res.json({
            valid: true
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to verify authentication code"
        });
    }
});

export default router;