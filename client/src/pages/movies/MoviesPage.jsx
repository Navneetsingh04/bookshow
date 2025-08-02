import React from "react";
import style from "./Movies.module.scss";
import Card from "../../components/molecules/card/Card";
import { getAllMovies } from "../../api/movies";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useEffect } from "react";

const MoviesPage = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const res = await getAllMovies();
      setMovies(res.data);
    } catch (err) {
      console.error(`Failed to load movies`, err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className={style.moviesPage}>
      <h2>Now Showing</h2>
      {loading ? (
        <h3>Loading...</h3>
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
    </div>
  );
};

export default MoviesPage;
