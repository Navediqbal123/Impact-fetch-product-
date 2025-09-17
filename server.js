import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

// ✅ CORS enable
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// ✅ Impact.com Products Fetch Route
app.get("/products", async (req, res) => {
  try {
    const auth = Buffer.from(
      `${process.env.IMPACT_ACCOUNT_SID}:${process.env.IMPACT_AUTH_TOKEN}`
    ).toString("base64");

    const impactRes = await fetch("https://api.impact.com/Mediapartners/<YOUR_PARTNER_ID>/Catalogs", {
      method: "GET",
      headers: {
        "Authorization": `Basic ${auth}`,
        "Accept": "application/json"
      }
    });

    const data = await impactRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ Default route
app.get("/", (req, res) => {
  res.send("Impact.com API backend is running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
