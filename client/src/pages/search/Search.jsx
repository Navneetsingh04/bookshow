import React from "react";
import searchList from "../../data/movies.json";
import style from "./Search.module.scss";
import { useLocation } from "react-router";
import Star from "../../assets/Star.png";
import Button from "../../components/atoms/buttons/Button";
import { useNavigate } from "react-router";

const Search = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get("query")?.toLowerCase() || "";

  const filtered = query
    ? searchList.filter((movie) => movie.title.toLowerCase().includes(query))
    : [];

  return (
    <main className={style.container}>
      <h1>Search Result</h1>
      <section className={style.result}>
        {filtered.length === 0 ? (
          <h1>No Result Found!</h1>
        ) : (
          filtered.map((data) => (
            <div key={data.id} className={style.card}>
              <div className={style.posterWrap}>
                <img
                  src={data.image}
                  alt={data.title}
                  className={style.poster}
                />
              </div>
              <div className={style.info}>
                <span className={style.language}>
                  {data.language?.toUpperCase()}
                </span>
                <h2>{data.title}</h2>
                <p className={style.rating}>
                  <img src={Star} alt="rating" />
                  <span>{data.rating} IMDb Rating</span>
                </p>
                <p className={style.description}>{data.description}</p>
                <p className={style.geners}>
                  <span>{data.duration}</span>
                  <span> • {data.genres}</span>
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
                    clickHandler={() => navigate(`/movies/${data.id}`)}
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
