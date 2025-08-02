const express = require("express");
const auth = require("../middlewares/auth.middleware")

const router = express.Router();

const {
  createBooking,
  getAllBookings,
  deleteBooking,
  getBookingByUser,
} = require("../controllers/bookings.controller");

router.post("/",auth,createBooking);

router.get("/all",getAllBookings)
router.get("/user/:id",auth,getBookingByUser)
router.delete("/:id",auth,deleteBooking)


module.exports = router;