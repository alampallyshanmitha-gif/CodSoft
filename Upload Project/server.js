const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const Order = require("./models/Order");

const app = express();

/* ===== MIDDLEWARE ===== */
app.use(cors());
app.use(express.json());
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("🍃 MongoDB Connected Successfully");
})
.catch((err) => {
  console.log("❌ MongoDB Connection Failed:");
  console.log(err.message);
});

/* ===== ROUTES ===== */

// Home route (optional check)
app.get("/", (req, res) => {
  res.send("🍰 Mitheora Bakehouse Backend is Running!");
});

// Place Order API
app.post("/api/order", async (req, res) => {
  try {
    const {
      name,
      email,
      cake,
      price,
      quantity,
      total,
      address,
      payment
    } = req.body;

    // Create new order
    const newOrder = new Order({
      name,
      email,
      cake,
      price,
      quantity,
      total,
      address,
      payment
    });

    await newOrder.save();

    res.status(201).json({
      message: "🎉 Order placed successfully!",
      order: newOrder
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "❌ Failed to place order"
    });
  }
});

// Get all orders (Admin purpose)
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

/* ===== START SERVER ===== */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});