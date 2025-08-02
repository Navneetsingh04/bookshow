import React, { useEffect, useState } from "react";
import style from "./SeatSelection.module.scss";
import Heading from "./partials/Heading";
import TimeSlot from "./partials/TimeSlot";
import Seat from "./partials/Seat";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import axios from "../../api/_api";


const SeatSelection = ({ movieData, onBookingComplete }) => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [currentMovie, setCurrentMovie] = useState(null);

  const { id, selectedDate: date } = useParams();

  useEffect(() => {
    if (date) {
      setSelectedDate(date);
    }
  }, [date]);

  useEffect(() => {
    if (id) {
      setCurrentMovie(id);
    }
  }, [id]);

  
  useEffect(() => {
  const fetchUser = async () => {
    try {
      const res = await axios.get("/auth/me");
      if (res.data?.success) {
        setCurrentUser(res.data.userId);
      } else {
        toast.error("Unauthorized");
      }
    } catch (error) {
      toast.error("Failed to authenticate");
    }
  };
  fetchUser();
}, []);


  return (
    <main className={style.container}>
      <div className={style.left}>
        <TimeSlot
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
        />
      </div>
      <div className={style.right}>
        <Heading />
        <Seat
          selectedTime={selectedTime}
          onInvalidSelection={() =>
            toast.warning("Please select a time slot first")
          }
          movieId={currentMovie}
          userId={currentUser}
          selectedDate={selectedDate}
        />
      </div>
    </main>
  );
};

export default SeatSelection;
