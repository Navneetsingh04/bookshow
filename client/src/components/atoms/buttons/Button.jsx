import React from "react";
import style from "./Button.module.scss";
import { Icon } from "@iconify/react";
const Button = (props) => {
  const { text, fIcon, bIcon, className, clickHandler } = props;
  return (
    <button className={`${style.button} ${className}`} onClick={clickHandler}>
      {bIcon && <Icon icon={bIcon} />}
      <span>{text}</span>
      {fIcon && <Icon icon={fIcon} />}
    </button>
  );
};

export default Button;
