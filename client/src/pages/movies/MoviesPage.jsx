import React from "react";
import style from "./Movies.module.scss";
import Card from "../../components/molecules/card/Card";
import moviesData from "../../data/movies.json";
import { useNavigate } from "react-router";

const MoviesPage = () => {
  const navigate = useNavigate();

  return (
    <div className={style.moviesPage}>
      <h2>Now Showing</h2>
      <div className={style.moviesGrid}>
        {moviesData.map((movie) => (
          <Card
            key={movie.id}
            {...movie}
            clickHandler={() => navigate(`/movies/${movie.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
