import React from "react";
import style from "./Card.module.scss";
import Button from "../../atoms/buttons/Button";
import Star from "../../../assets/Star.png";

const Card = (props) => {
  
  const {title, genres, year, duration, rating, thumbnailImage, clickHandler } = props;
  return (
    <main className={style.container}>
      <article>
        <img src={thumbnailImage} alt={title}  />
        <h2>{title}</h2>
        <p>{year} • {Array.isArray(genres) ? genres.join(" | ") : "Unknown genre"} • {duration}</p>
        <div className={style.cardActions}>
          <Button
            className={style.btn}
            text="Buy Ticket"
            clickHandler={clickHandler}
          />
          <span className={style.rating}>
            <img src={Star} alt="rating" />
            <span>{rating}</span>
          </span>
        </div>
      </article>
    </main>
  );
};

export default Card;
