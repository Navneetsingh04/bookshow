import React, { useState } from "react";
import style from "./Booking.module.scss";
import Button from "../../../../../components/atoms/buttons/Button";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useParams } from "react-router";

const Booking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);

  const generateDates = () => {
    const today = new Date();
    const options = { weekday: "short" };

    return Array.from({ length: 7 }).map((_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() + index);

      return {
        date: date.toISOString().split("T")[0],   // YYYY-MM-DD
        day: new Intl.DateTimeFormat("en-IN", options).format(date),   // Mon, Tue,
      };
    });
  };
  const [weekDates] = useState(generateDates());

  return (
    <main className={style.container}>
      <h3>Choose Date</h3>
      <div className={style.content}>
        <div className={style.datePicker}>
          <button className={style.arrow}>
            <Icon icon="mdi:chevron-left" />
          </button>
          {weekDates.map((d) => {
            const dayNumber = new Date(d.date).getDate();
            return (
              <button
                key={d.date}
                className={`${style["date-btn"]} ${
                  selectedDate === d.date ? style.active : ""
                }`}
                onClick={() => setSelectedDate(d.date)}
              >
                <span>{d.day}</span>
                <span>{dayNumber}</span>
              </button>
            );
          })}

          <button className={style.arrow}>
            <Icon icon="mdi:chevron-right" />
          </button>
        </div>
        <Button
          className={style["book-now-btn"]}
          text="Book Now"
          clickHandler={() => {
            if (!selectedDate) {
              toast.warning("Please select a date");
            } else {
              navigate(`/movies/${id}/${selectedDate}`);
            }
          }}
        />
      </div>
    </main>
  );
};

export default Booking;
