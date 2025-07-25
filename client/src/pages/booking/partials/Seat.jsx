import React, { useEffect, useState } from "react";
import style from "./style.module.scss";
import Button from "../../../components/atoms/buttons/Button";
import { toast } from "react-toastify";

const Rows = ["A", "B", "C", "D", "E", "F", "G"];

const seatLayout = [
  ["A1", "A2", "A3", "A4", "A5", "A6", "A7", "A8", "A9"],
  ["B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9"],
  [
    "C1", "C2", "C3", "C4", "C5", "C6", "C7", "C8", "C9",
    "C10", "C11", "C12", "C13", "C14", "C15", "C16", "C17", "C18",
  ],
  [
    "D1", "D2", "D3", "D4", "D5", "D6", "D7", "D8", "D9",
    "D10", "D11", "D12", "D13", "D14", "D15", "D16", "D17", "D18",
  ],
  [
    "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9",
    "E10", "E11", "E12", "E13", "E14", "E15", "E16", "E17", "E18",
  ],
  [
    "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9",
    "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18",
  ],
  [
    "G1", "G2", "G3", "G4", "G5", "G6", "G7", "G8", "G9",
    "G10", "G11", "G12", "G13", "G14", "G15", "G16", "G17", "G18",
  ],
]

const Seat = ({selectedTime, onInvalidSelection }) => {
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [alreadyFilled, setAlreadyFilled] = useState([]);

  useEffect(() => {
    setAlreadyFilled(["A1", "B5", "F10", "D9"]);
  }, []);

  const handleSeat = (s) => {
    if(!selectedTime) {
      onInvalidSelection();
      return;
    }
    if (alreadyFilled.includes(s)) return;
    setSelectedSeat(s);
    console.log(`${s} seat is Selected`);
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
                      selectedSeat === s
                        ? style.selectedSeat
                        : alreadyFilled.includes(s)
                        ? style.alreadyFilled
                        : ""
                    }`}
                    onClick={() => handleSeat(s)}
                  ></div>
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
          {/* Row numbers only after B and G */}
          {(Rows[i] === "B" || Rows[i] === "G") && (
            <div className={style.rowNumbers}>
              <div className={style.rowLetter}></div>
              <div className={style.numbersContainer}>
                {seat.map((s, index) => (
                  <React.Fragment key={index}>
                    <span>{index + 1}</span>
                    {/* space in the middle of rows to align with seats */}
                    {Rows[i] === "G" &&
                      index === Math.floor(seat.length / 2) - 1 && (
                        <span className={style.numberSpace}></span>
                      )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
      <Button
        className={style["proceed-btn"]}
        text="Proceed to checkout"
        fIcon="solar:arrow-right-linear"
        disabled={!selectedSeat}
        clickHandler={() => {
          if (selectedSeat) {
            toast.info(`you have selected seat: ${selectedSeat}`);
          } else {
            toast.warning("Please select a seat first");
          }
        }}
      />
    </article>
  );
};

export default Seat;
