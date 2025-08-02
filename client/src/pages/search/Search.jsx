import React, { useEffect, useState } from "react";
import style from "./Search.module.scss";
import { useLocation, useNavigate } from "react-router";
import Star from "../../assets/Star.png";
import Button from "../../components/atoms/buttons/Button";
import { searchMovies } from "../../api/movies";
const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query")?.toLowerCase() || "";

  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      setLoading(true);
      try {
        const res = await searchMovies(query);
        setFiltered(res.data); 
      } catch (error) {
        console.error("Error fetching movies:", error);
        setFiltered([]);
      }
      setLoading(false);
    };

    fetchSearchResults();
  }, [query]);

  return (
    <main className={style.container}>
      <h1>Search Result</h1>
      <section className={style.result}>
        {loading ? (
          <h2>Loading...</h2>
        ) : filtered.length === 0 ? (
          <h2>No Result Found!</h2>
        ) : (
          filtered.map((data) => (
            <div key={data._id} className={style.card}>
              <div className={style.posterWrap}>
                <img
                  src={data.thumbnailImage}
                  alt={data.title}
                  className={style.poster}
                />
              </div>
              <div className={style.info}>
                <span className={style.language}>
                  {(data.languages?.[0] || "ENGLISH").toUpperCase()}
                </span>
                <h2>{data.title}</h2>
                <p className={style.rating}>
                  <img src={Star} alt="rating" />
                  <span>{data.rating} IMDb Rating</span>
                </p>
                <p className={style.description}>{data.description}</p>
                <p className={style.geners}>
                  <span>{data.duration}</span>
                  <span> • {data.genres?.join(" | ")}</span>
                  <span> • {data.year}</span>
                </p>
                <div className={style.actions}>
                  <Button
                    className={style["watch-trailer-btn"]}
                    text="Watch Trailer"
                    bIcon="octicon:play-16"
                  />
                  <Button
                    className={style["buy-ticket-btn"]}
                    text="Buy Ticket"
                    clickHandler={() => navigate(`/movies/${data._id}`)}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </section>
    </main>
  );
};

export default Search;
