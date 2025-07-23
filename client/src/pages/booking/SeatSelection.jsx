import React from "react";
import style from "./SeatSelection.module.scss";
import Heading from "./partials/Heading";
import TimeSlot from "./partials/TimeSlot";
import Seat from "./partials/Seat";
const SeatSelection = () => {
  return (
    <main className={style.container}>
      <div className={style.left}>
        <TimeSlot />
      </div>
      <div className={style.right}>
        <Heading />
        <Seat />
      </div>
    </main>
  );
};

export default SeatSelection;
