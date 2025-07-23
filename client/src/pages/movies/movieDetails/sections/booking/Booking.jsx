import React, { useState } from "react";
import style from "./Booking.module.scss";
import Button from "../../../../../components/atoms/buttons/Button";
import dates from "../../../../../data/dayDate.json";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
const Booking = () => {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);

  return (
    <main className={style.container}>
      <h3>Choose Date</h3>
      <div className={style.content}>
        <div className={style.datePicker}>
          <button className={style.arrow}>
            <Icon icon="mdi:chevron-left" />
          </button>
          {dates.map((d) => (
            <button
              key={d.date}
              className={`${style["date-btn"]} ${
                selected === d.date ? style.active : ""
              }`}
              onClick={() => setSelected(d.date)}
            >
              <span>{d.day}</span>
              <span>{d.date}</span>
            </button>
          ))}
          <button className={style.arrow}>
            <Icon icon="mdi:chevron-right" />
          </button>
        </div>
        <Button
          className={style["book-now-btn"]}
          text="Book Now"
          clickHandler={() => {
            if (!selected) {
              toast.info("Please select a date");
            } else {
              navigate("/seat-selection");
            }
          }}
        />
      </div>
    </main>
  );
};

export default Booking;
