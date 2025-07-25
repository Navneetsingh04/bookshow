import React from "react";
import Screen from "../../../assets/Screen.png";
import style from "./style.module.scss";
const Heading = () => {
  return (
    <div className={style.headingContainer}>
      <h1>Select Your Seat</h1>
      <img src={Screen} alt="screen" />
      <div className={style.screen}>SCREEN SIDE</div>
    </div>
  );
};

export default Heading;
