const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "User ID is required!"],
      ref: "Users",
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Movie ID is required!"],
      ref: "Movies",
    },
    seat: {
      type: [String], // Changed to array to support multiple seats
      required: [true, "Seat is required!"],
    },
    payments: {
      id: {
        type: String,
        required: [true, "Payment ID is required!"],
      },
      status: {
        type: String,
        required: [true, "Payment status is required!"],
        enum: ["Pending", "Completed", "Failed"],
        default: "Pending",
      },
      initiatedAt: {
        type: Date,
        default: Date.now,
      },
      amount: {
        type: Number,
        default: 0,
      },
    },
    amount: {
      type: Number,
      default: 0,
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    slot: {
      type: String,
      required: [true, "Slot is required!"],
      enum: ["Morning", "Afternoon", "Evening", "Night"],
      default: "Evening",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bookings", bookingSchema);
