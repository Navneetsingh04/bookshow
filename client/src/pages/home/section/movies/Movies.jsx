import React from "react";
import style from "./Movies.module.scss";
import Card from "../../../../components/molecules/card/Card";
import { Icon } from "@iconify/react";
import Button from "../../../../components/atoms/buttons/Button";
import moviesData from "../../../../data/movies.json";
import { useNavigate } from "react-router";
const Movies = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className={style.container}>
        <div className={style.header}>
          <h1>Now Showing</h1>
          <p>
            <span>View All</span>
            <span>
              <Icon icon={"solar:arrow-right-linear"} />
            </span>
          </p>
        </div>
        <div className={style.moviesGrid}>
          {moviesData.map((movie) => (
            <Card
              key={movie.id}
              {...movie}
              clickHandler={() => navigate(`/movies/${movie.id}`)}
            />
          ))}
        </div>
      </section>
      <div className={style.button}>
        <Button
          className={style["showmore-btn"]}
          text="Show More"
          clickHandler={() => navigate("/movies")}
        />
      </div>
    </>
  );
};

export default Movies;
