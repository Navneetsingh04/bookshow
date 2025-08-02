import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import style from "./style.module.scss";
import Button from "../../../components/atoms/buttons/Button";
import { toast } from "react-toastify";
import { createBooking, getBookedSeats } from "../../../api/bookings";
import PaymentPopup from "../../../components/PaymentPopup/PaymentPopup";

const Rows = ["A", "B", "C", "D", "E", "F", "G"];

const seatLayout = [
  ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"],
  ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"],
  ["C1","C2","C3","C4","C5","C6","C7","C8","C9","C10",
    "C11","C12","C13","C14","C15","C16","C17","C18",],
  ["D1","D2","D3","D4","D5","D6","D7","D8","D9","D10",
    "D11","D12","D13","D14","D15","D16","D17","D18",],
  ["E1","E2","E3","E4","E5","E6","E7","E8","E9","E10",
    "E11","E12","E13","E14","E15","E16","E17","E18",],
  ["F1","F2","F3","F4","F5","F6","F7","F8","F9","F10",
    "F11","F12","F13","F14","F15","F16","F17","F18",],
  ["G1","G2","G3","G4","G5","G6","G7","G8","G9","G10",
    "G11","G12","G13","G14","G15","G16","G17","G18",],
];

const timeSlotMapping = {
  "09:30": "Morning",
  "12:30": "Afternoon",
  "04:30": "Evening",
  "08:30": "Night",
};

const Seat = ({
  selectedTime,
  onInvalidSelection,
  movieId,
  userId,
  selectedDate,
  onSuccessBooking,
}) => {
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [alreadyFilled, setAlreadyFilled] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchSeat, setFetchedSeat] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false);
  const [bookingData, setBookingData] = useState(null);

  const fetchMovies = async () => {
    if (!movieId || !selectedTime || !selectedDate) {
      setAlreadyFilled([]);
      return;
    }
    setFetchedSeat(true);

    try {
      const slot = timeSlotMapping[selectedTime];
      const bookedSeats = await getBookedSeats(movieId, selectedDate, slot);

      console.log("Fetched booked sets: ", bookedSeats);
      setAlreadyFilled(bookedSeats);
    } catch (error) {
      console.error("Error fetching booked seats:", error);
      toast.error("Failed to load seat availability");
      setAlreadyFilled([]);
    } finally {
      setFetchedSeat(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [movieId, selectedDate, selectedTime]);

  const handleSeat = (s) => {
    if (!selectedTime) {
      onInvalidSelection();
      return;
    }
    if (alreadyFilled.includes(s)) return;
    
    if (selectedSeats.includes(s)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== s));
      console.log(`${s} seat is deselected`);
    } else {
      if (selectedSeats.length >= 5) {
        toast.warning("You can select maximum 5 seats at a time");
        return;
      }
      setSelectedSeats([...selectedSeats, s]);
      console.log(`${s} seat is selected`);
    }
  };

  const handleBooking = async () => {
    if (!userId) {
      toast.warning("You must be logged in to book a seat.");
      return;
    }
    if (!selectedTime) {
      toast.warning("Please select a time slot first");
      return;
    }
    if (selectedSeats.length === 0) {
      toast.warning("Please select at least one seat");
      return;
    }
    if (!selectedDate) {
      toast.warning("Please select a date");
      return;
    }

    //  booking data and show payment popup
    const bookingDetails = {
      userId,
      movieId,
      seats: selectedSeats,
      slot: timeSlotMapping[selectedTime],
      bookingDate: selectedDate,
      amount: selectedSeats.length * 250,
    };
    
    setBookingData(bookingDetails);
    setShowPaymentPopup(true);
  };

  const handlePaymentSuccess = () => {
    // Reset selected seats after successful payment
    setSelectedSeats([]);
    fetchMovies();
  };

  const handleClosePaymentPopup = () => {
    setShowPaymentPopup(false);
    setBookingData(null);
  };

  return (
    <article className={style.container}>
      {seatLayout.map((seat, i) => (
        <div key={i}>
          <div className={style.rows}>
            <h3>{Rows[i]}</h3>
            <div className={style.seatRow}>
              {seat.map((s, index) => (
                <React.Fragment key={s}>
                  <div
                    className={`${style.seat} ${
                      selectedSeats.includes(s)
                        ? style.selectedSeat
                        : alreadyFilled.includes(s)
                        ? style.alreadyFilled
                        : ""
                    }`}
                    onClick={() => handleSeat(s)}
                  >{s.slice(1)}</div>
                  {/* space in the middle of rows */}
                  {!["A", "B"].includes(Rows[i]) &&
                    index === Math.floor(seat.length / 2) - 1 && (
                      <div className={style.seatSpace}></div>
                    )}
                </React.Fragment>
              ))}
            </div>
          </div>
          {/* space after rows B and D */}
          {(Rows[i] === "B" || Rows[i] === "D") && (
            <div className={style.rowSpace}></div>
          )}
        </div>
      ))}
      
      {/* Selected Seats Summary */}
      {selectedSeats.length > 0 && (
        <div className={style.summaryContainer}>
          <h4>Selected Seats: {selectedSeats.join(', ')}</h4>
          <p>Total Amount: ₹{selectedSeats.length * 250}</p>
          <p className={style.seatLimit}>
            {selectedSeats.length}/5 seats selected
          </p>
        </div>
      )}
      
      <Button
        className={style["proceed-btn"]}
        text={`Proceed to checkout`}
        fIcon="solar:arrow-right-linear"
        disabled={selectedSeats.length === 0 || loading || fetchSeat}
        clickHandler={handleBooking}
      />
      
      {/* Payment Popup */}
      <PaymentPopup
        isOpen={showPaymentPopup}
        onClose={handleClosePaymentPopup}
        bookingData={bookingData}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </article>
  );
};
export default Seat;
