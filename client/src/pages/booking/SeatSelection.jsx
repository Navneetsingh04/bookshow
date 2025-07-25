import React, { useState } from "react";
import style from "./SeatSelection.module.scss";
import Heading from "./partials/Heading";
import TimeSlot from "./partials/TimeSlot";
import Seat from "./partials/Seat";
import { toast } from "react-toastify";
const SeatSelection = () => {

  const [selectedTime, setSelectedTime] = useState(null);

  return (
    <main className={style.container}>
      <div className={style.left}>
        <TimeSlot selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
      </div>
      <div className={style.right}>
        <Heading />
        <Seat 
        selectedTime={selectedTime}
        onInvalidSelection={() => toast.warning("Please select a time slot first")}
        />
      </div>
    </main>
  );
};

export default SeatSelection;
