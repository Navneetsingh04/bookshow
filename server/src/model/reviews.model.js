const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "User ID is required!"],
    },
    movieId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movies",
      required: [true, "Movie ID is required!"],
    },
    bookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bookings",
      required: [true, "Booking ID is required!"],
    },
    review: {
      type: String,
      required: [true, "Review is required!"],
      minlength: [10, "Review must be at least 10 characters long"],
    },
    rating: {
      type: Number,
      required: [true, "Rating is required!"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must be at most 5"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Reviews", reviewSchema);
