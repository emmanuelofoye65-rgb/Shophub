import express from "express";

const app = express();

app.use(express.json());

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

// Paystack Initialization Endpoint
app.post("/api/paystack/initialize", async (req, res) => {
  try {
    const { email, amount, metadata } = req.body;
    const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
    
    if (!PAYSTACK_SECRET) {
      return res.status(500).json({ error: "Paystack secret key not configured" });
    }

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100), // convert to kobo/cents
        metadata,
        callback_url: `${req.protocol}://${req.get('host')}/payment/callback`
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Paystack Error:", error);
    res.status(500).json({ error: "Failed to initialize payment" });
  }
});

// Paystack Webhook/Verify endpoint
app.get("/api/paystack/verify/:reference", async (req, res) => {
  try {
    const { reference } = req.params;
    const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
    
    const response = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ error: "Failed to verify payment" });
  }
});

export default app;
