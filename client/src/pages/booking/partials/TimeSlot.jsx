import React from "react";
import style from "./style.module.scss";
import { Icon } from "@iconify/react";

const TimeSlot = ({ selectedTime, setSelectedTime }) => {
  const timings = ["09:30", "12:30", "04:30", "08:30"];

  return (
    <main className={style.timeSlotContainer}>
      <h3>Available Timings</h3>
      <div className={style.timeSlots}>
        {timings.map((time) => (
          <div
            key={time}
            className={`${style.timeSlot} ${
              selectedTime === time ? style.active : ""
            }`}
            onClick={() => setSelectedTime(time)}
          >
            <Icon icon="icon-park-outline:time" />
            <span>{time}</span>
          </div>
        ))}
      </div>
    </main>
  );
};

export default TimeSlot;
