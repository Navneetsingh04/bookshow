import React from "react";
import style from "./Details.module.scss";
import Star from "../../../../../assets/Star.png";
import Button from "../../../../../components/atoms/buttons/Button";
import { Icon } from "@iconify/react";
import movies from "../../../../../data/movies.json";
import { useParams } from "react-router";
import Cast from "./Cast.jsx";
const Details = () => {
  const { id } = useParams();
  const movie = movies.find((movie) => movie.id === Number(id));
  const clickHandler = () => {
    console.log("Button clicked");
  };
  return (
    <main className={style.container}>
      <article>
        {/* Left Image */}

        <img src={movie.image} alt={movie.title} />

        {/* Right Section */}
        <div className={style.details}>
          <p className={style.language}>{movie.language.toUpperCase()}</p>
          <p className={style.title}>{movie.title}</p>
          <span className={style.rating}>
            <img src={Star} alt="rating" />
            {movie.rating} IMDb Rating
          </span>
          <p className={style.description}>{movie.description}</p>
          <p className={style.genre}>
            <span>{movie.duration}</span>
            <span>• {movie.genre}</span>
            <span>• 1 May {movie.year}</span>
          </p>
          <div className={style.actions}>
            <Button
              className={style["watch-trailer-btn"]}
              text="Watch Trailer"
              bIcon="octicon:play-16"
              clickHandler={clickHandler}
            />
            <Button
              className={style["buy-ticket-btn"]}
              text="Buy Ticket"
              clickHandler={clickHandler}
            />
            <Icon className={style["svg-heart"]} icon="mdi-light:heart" />
          </div>
        </div>
      </article>

      <Cast/>
    </main>
  );
};

export default Details;
