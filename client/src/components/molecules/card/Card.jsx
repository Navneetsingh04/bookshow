import React from "react";
import style from "./Card.module.scss";
import Button from "../../atoms/buttons/Button";
import Star from "../../../assets/Star.png";
const Card = ({movie}) => {
  const clickHandler = () => {
    console.log("buy Ticket clicked");
  }
  
  const {title, genre, year, duration, rating, image} = movie;

  return (
    <main className={style.container}>
      <article>
        <img src={image} alt={title} />
        <h2>{title}</h2>
        <p>{year} - {genre} - {duration}</p>
        <div className={style.cardActions}>
          <Button
            className={style["card-btn"]}
            text="Buy Ticket"
            onClick={clickHandler}
          />
          <span className={style["rating"]}>
            <img src={Star} alt="rating" />
            {rating}
          </span>
        </div>
      </article>
    </main>
  );
};

export default Card;
