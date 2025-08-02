const Booking = require("../model/bookings.model.js");
const emailTemplate = require("../utils/emailTemplate.js");
const sendBookingEmail = require("../utils/email.js");

async function createBooking(req, res) {
  try {
    const { userId, movieId, seat, seats, slot, bookingDate } = req.body;

    const seatsToBook = seats || (seat ? [seat] : []);
    
    if (!userId || !movieId || seatsToBook.length === 0 || !slot) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Check maximum seat limit
    if (seatsToBook.length > 5) {
      return res.status(400).json({
        success: false,
        message: "You can book maximum 5 seats at a time",
      });
    }

    // Check if any of the seats are already booked
    const alreadyBooked = await Booking.findOne({
      movieId,
      seat: { $in: seatsToBook },
      slot,
      bookingDate: {
        $gte: new Date(new Date(bookingDate).setHours(0, 0, 0, 0)),
        $lte: new Date(new Date(bookingDate).setHours(23, 59, 59, 999)),
      },
    });
    
    if (alreadyBooked) {
      return res.status(409).json({
        success: false,
        message: "One or more seats are already booked for this movie and slot",
      });
    }

    // Save amount in booking (from req.body.amount or req.body.payments.amount)
    let bookingData = { 
      ...req.body, 
      seat: seatsToBook // Ensure we use the seats array
    };
    if (!bookingData.amount && bookingData.payments && bookingData.payments.amount) {
      bookingData.amount = bookingData.payments.amount;
    }
    const booking = await Booking.create(bookingData);

    const populateBooking = await Booking.findById(booking._id)
      .populate("userId")
      .populate("movieId");

    // Sending email after successful booking

    try {
      if (populateBooking.userId?.email) {
        // Prepare email details
        const emailData = {
          userName: populateBooking.userId.name,
          movieName: populateBooking.movieId.title,
          seat: Array.isArray(populateBooking.seat) ? populateBooking.seat.join(', ') : populateBooking.seat,
          slot: populateBooking.slot,
          status: populateBooking.payments?.status || "Completed",
          date: new Date(populateBooking.bookingDate).toLocaleDateString(),
        };
        const emailContent = emailTemplate(emailData);
        const subject = `Booking Confirmation for ${emailData.movieName}`;
        await sendBookingEmail(populateBooking.userId.email, subject, emailContent);
      }
    } catch (error) {
      console.error("Email sending failed:", error);
    }

    return res.status(201).json({
      success: true,
      result: booking,
      message: "Ticket booked successfully",
    });
  } catch (error) {
    console.error("Booking error:", error);
    return res.status(400).json({
      success: false,
      error: "Failed to book ticket",
    });
  }
}

async function getBookingByUser(req, res) {
  try {
    const userId = req.params.id;
    const bookings = await Booking.find({ userId })
      .populate("movieId")
      .populate("userId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      result: bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to fetch bookings",
    });
  }
}

async function getAllBookings(req, res) {
  try {
    const { date, status, movieId, slot } = req.query;
    const query = {};

    if (movieId) {
      query.movieId = movieId;
    }

    if (slot) {
      query.slot = slot;
    }

    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      query.bookingDate = { $gte: start, $lte: end };
    }

    if (status) {
      query["payments.status"] = status;
    }

    const bookings = await Booking.find(query)
      .populate("userId")
      .populate("movieId")
      .sort({ createdAt: -1 });

    return res.status(200).json({ success: true, result: bookings });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: "Failed to fetch bookings",
    });
  }
}

async function deleteBooking(req, res) {
  try {
    const bookingId = req.params.id;
    const deleted = await Booking.findByIdAndDelete(bookingId);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Booking ID not found",
      });
    }

    return res.status(200).json({
      success: true,
      result: deleted,
      message: "Deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
}

module.exports = {
  createBooking,
  getAllBookings,
  deleteBooking,
  getBookingByUser,
};
