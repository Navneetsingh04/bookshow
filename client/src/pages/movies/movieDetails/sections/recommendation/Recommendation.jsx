import React, { useEffect, useState } from "react";
import style from "./Recommendation.module.scss";
import Button from "../../../../../components/atoms/buttons/Button";
import Card from "../../../../../components/molecules/card/Card";
import { Icon } from "@iconify/react";
import { getHomepageMovies } from "../../../../../api/movies";
import { useNavigate } from "react-router";
const Recommendation = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const res = await getHomepageMovies();
      setMovies(res.data);
    } catch (error) {
      console.error("Failed to load Movies", error);
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
          <h3>You May Also Like</h3>
          <p onClick={() => navigate("/movies")}>
            <span>View All</span>
            <span>
              <Icon icon={"solar:arrow-right-linear"} />
            </span>
          </p>
        </div>
        {loading ? (
          <p>Loading Recommendation for You...</p>
        ) : movies.length === 0 ? (
          <p> No movies Available for You</p>
        ) : (
          <div className={style.moviesGrid}>
            {movies.slice(4).map((movie) => (
              <Card
                key={movie._id}
                {...movie}
                clickHandler={() => navigate(`/movies/${movie._id}`)}
              />
            ))}
          </div>
        )}
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

export default Recommendation;
