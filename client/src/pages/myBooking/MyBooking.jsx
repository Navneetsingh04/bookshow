import React from "react";
import style from "./MyBooking.module.scss";
import bookingData from "../../data/booking.json";

const MyBooking = () => {
  return (
    <section className={style.bookingsContainer}>
      <h3 className={style.sectionTitle}>My Bookings</h3>
      {bookingData.map((booking) => (
        <div className={style.bookingCard} key={booking.id}>
          {/* Left Section: Image */}
          <img
            src={booking.image}
            alt={booking.title}
            className={style.movieImage}
          />

          {/* Middle Section: Movie Info */}
          <div className={style.bookingDetails}>
            <h4 className={style.movieTitle}>{booking.title}</h4>
            <p className={style.movieDuration}>{booking.duration}</p>
            <p className={style.movieDate}>
              {booking.date} • {booking.time}
            </p>
          </div>

          {/* Right Section: Price & Tickets */}
          <div className={style.ticketInfo}>
            <span className={style.price}>₹{booking.price}</span>
            <p>
              Total Tickets: <span>{booking.totalTickets}</span>
            </p>
            <p>
              Seat Number: <span>{booking.seatNumbers.join(", ")}</span>
            </p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MyBooking;
