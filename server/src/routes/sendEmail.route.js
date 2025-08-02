const express = require("express");
const router = express.Router();

const sendBookingEmail = require("../utils/email");
const emailTemplate = require("../utils/emailTemplate");

async function sendEmail(req, res) {
  const { to, userName, movieName, seat, slot, status, date } = req.body;

  if (!to) {
    console.warn("Email address not provided in request body.");
    return res.status(400).json({ error: "Email address is required." });
  }

  try {
    const htmlContent = emailTemplate({
      userName,
      movieName,
      seat,
      slot,
      status,
      date,
    });

    const subject = `Booking Confirmation for ${movieName}`;

    await sendBookingEmail(to, subject, htmlContent);

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({
      error: "Email failed to send",
      details: error.message,
    });
  }
}
router.post("/send-email", sendEmail);
module.exports = router;
