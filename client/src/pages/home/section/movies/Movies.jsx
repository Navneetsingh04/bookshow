import React, { useEffect, useState } from "react";
import style from "./Movies.module.scss";
import Card from "../../../../components/molecules/card/Card";
import { Icon } from "@iconify/react";
import Button from "../../../../components/atoms/buttons/Button";
import { getHomepageMovies } from "../../../../api/movies";
import { useNavigate } from "react-router";

const Movies = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const res = await getHomepageMovies();
      setMovies(res.data);
    } catch (error) {
      console.error(`Failed to load movies`, error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <>
      <section className={style.container}>
        <div className={style.header}>
          <h1>Now Showing</h1>
          <p onClick={() => navigate("/movies")} className={style.viewAll}>
            <span>View All</span>
            <span>
              <Icon icon={"solar:arrow-right-linear"} />
            </span>
          </p>
        </div>

        {loading ? (
          <p>Loading movies...</p>
        ) : movies.length === 0 ? (
          <p>No movies available</p>
        ) : (
          <div className={style.moviesGrid}>
            {movies.map((movie) => (
              <Card
                key={movie._id}
                {...movie}
                clickHandler={() => navigate(`/movies/${movie._id}`)}
              />
            ))}
          </div>
        )}
      </section>

      {!loading && movies.length > 0 && (
        <div className={style.button}>
          <Button
            className={style["showmore-btn"]}
            text="Show More"
            clickHandler={() => navigate("/movies")}
          />
        </div>
      )}
    </>
  );
};

export default Movies;
