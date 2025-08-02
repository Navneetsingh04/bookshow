
import React, { useEffect, useState } from "react";
import style from "./MyBooking.module.scss";
import { getBookingsByUser } from "../../api/bookings";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";


const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user.user);
  const userId = user?._id;

  const fetchBookings = async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    try {
      const res = await getBookingsByUser(userId); 
      setBookings(res.data.result || []);
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
      toast.error("Unable to load bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [userId]);

  if (loading) return <p className={style.loadingText}>Loading bookings...</p>;

  if (bookings.length === 0) return <p className={style.emptyText}>No bookings found.</p>;

  return (
    <section className={style.bookingsContainer}>
      <h3 className={style.sectionTitle}>My Bookings</h3>

      {bookings.map((booking) => (
        <div className={style.bookingCard} key={booking._id}>
          {/* Left Section: Movie Image */}
          <img
            src={booking.movieId?.thumbnailImage || "/placeholder.png"}
            alt={booking.movieId?.title || "Movie"}
            className={style.movieImage}
          />

          {/* Middle Section: Movie Info */}
          <div className={style.bookingDetails}>
            <h4 className={style.movieTitle}>{booking.movieId?.title || "N/A"}</h4>
            <p className={style.movieDuration}>{booking.movieId?.duration || "N/A"}</p>
            <p className={style.movieDate}>
              {new Date(booking.bookingDate).toLocaleDateString()} • {booking.slot}
            </p>
          </div>

          {/* Right Section: Tickets Info */}
          <div className={style.ticketInfo}>
            <span className={style.price}>
              ₹{booking.amount || booking.payments?.amount || 0}
            </span>
            <p>
              Total Tickets: <span>{booking.totalTickets || (Array.isArray(booking.seat) ? booking.seat.length : 1)}</span>
            </p>
            <p>
              Seat Numbers:{" "}
              <span>{Array.isArray(booking.seat) ? booking.seat.join(", ") : booking.seat}</span>
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MyBooking;
