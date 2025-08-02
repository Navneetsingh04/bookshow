const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


router.get("/get-razorpay-key-id", (req, res) => {
  res.json({ razorpay_key_id: process.env.RAZORPAY_KEY_ID });
});


router.post("/order", async (req, res) => {
  const { amount, orderId } = req.body;

  try {
    const options = {
      amount: amount * 100, 
      currency: "INR",
      receipt: orderId,
    };

    const order = await razorpay.orders.create(options);

    res.json({
      order_id: order.id,
      currency: order.currency,
      amount: order.amount,
    });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
});


router.post("/verify", (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    return res.json({ success: true });
  } else {
    return res.status(400).json({ success: false, message: "Payment verification failed" });
  }
});

module.exports = router;
