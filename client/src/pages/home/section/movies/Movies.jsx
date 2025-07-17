import React from "react";
import style from "./Movies.module.scss";
import Card from "../../../../components/molecules/card/Card";
import movie1 from "../../../../assets/movie1.png";
import movie2 from "../../../../assets/movie2.png";
import movie3 from "../../../../assets/movie3.png";
import movie4 from "../../../../assets/movie4.png";
import { Icon } from "@iconify/react";
const Movies = () => {
  const movies = [
    {
      id: 1,
      title: "Alita Battle Angel 4k 2019",
      genre: "Action, Adventure",
      year: "2018",
      duration: "2h 8m",
      rating: 4.5,
      image: movie1,
    },
    {
      id: 2,
      title: "Alita Battle Angel 4k 2019",
      genre: "Action, Adventure",
      year: "2018",
      duration: "2h 8m",
      rating: 4.5,
      image: movie2,
    },
    {
      id: 3,
      title: "Alita Battle Angel 4k 2019",
      genre: "Action, Adventure",
      year: "2018",
      duration: "2h 8m",
      rating: 4.5,
      image: movie3,
    },
    {
      id: 4,
      title: "Alita Battle Angel 4k 2019",
      genre: "Action, Adventure",
      year: "2018",
      duration: "2h 8m",
      rating: 4.5,
      image: movie4,
    },
    {
      id: 5,
      title: "Alita Battle Angel 4k 2019",
      genre: "Action, Adventure",
      year: "2018",
      duration: "2h 8m",
      rating: 4.5,
      image: movie4,
    },
    {
      id: 6,
      title: "Alita Battle Angel 4k 2019",
      genre: "Action, Adventure",
      year: "2018",
      duration: "2h 8m",
      rating: 4.5,
      image: movie3,
    },
    {
      id: 7,
      title: "Alita Battle Angel 4k 2019",
      genre: "Action, Adventure",
      year: "2018",
      duration: "2h 8m",
      rating: 4.5,
      image: movie1,
    },
    {
      id: 8,
      title: "Alita Battle Angel 4k 2019",
      genre: "Action, Adventure",
      year: "2018",
      duration: "2h 8m",
      rating: 4.5,
      image: movie2,
    },
  ];

  return (
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
        {movies.map((movie) => (
          <Card key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default Movies;
