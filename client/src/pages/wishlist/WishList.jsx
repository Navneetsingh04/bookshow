import React from "react";
import style from "./WishList.module.scss";
import moviesData from "../../data/movies.json";
import Button from "../../components/atoms/buttons/Button";
import { useNavigate } from "react-router";
const WishList = () => {
  const navigate = useNavigate();
  return (
    <main className={style.container}>
      <h1 className={style.title}>Wishlist</h1>

      {moviesData.length ? (
        <div className={style.movies}>
          {moviesData.map((movie) => (
            <div key={movie.id} className={style.movie}>
              <img
                src={movie.image}
                alt={movie.title}
                className={style.poster}
              />
              <div className={style.info}>
                <h2 className={style.movieTitle}>{movie.title}</h2>
                <p className={style.movieDescription}>{movie.description}</p>
                <div className={style.actions}>
                  <Button
                    className={style["watch-trailer-btn"]}
                    text="Watch Trailer"
                    bIcon="octicon:play-16"
                  />
                  <Button
                    className={style["buy-ticket-btn"]}
                    text="Buy Ticket"
                    clickHandler={() => navigate(`/movies/${movie.id}`)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className={style.emptyMessage}>No Movies Added in Wishlist!</h2>
      )}
    </main>
  );
};

export default WishList;
