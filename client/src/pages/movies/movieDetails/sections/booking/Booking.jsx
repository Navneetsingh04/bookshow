import React, { useState } from "react";
import style from "./Booking.module.scss";
import Button from "../../../../../components/atoms/buttons/Button";
import dates from "../../../../../data/dayDate.json";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useParams } from "react-router";
const Booking = () => {
  const { id } = useParams();
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
          {dates.map((d) => {
            const dayNumber = new Date(d.date).getDate(); 
            return (
              <button
                key={d.date}
                className={`${style["date-btn"]} ${
                  selected === d.date ? style.active : ""
                }`}
                onClick={() => setSelected(d.date)}
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
            if (!selected) {
              toast.warning("Please select a date");
            } else {
              navigate(`/movies/${id}/${selected}`);
            }
          }}
        />
      </div>
    </main>
  );
};

export default Booking;
