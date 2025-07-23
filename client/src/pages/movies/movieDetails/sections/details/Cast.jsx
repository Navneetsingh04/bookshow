import React from "react";
import style from "./Cast.module.scss";
import castData from "../../../../../data/cast.json";
const Cast = () => {
  return (
    <div className={style.cast}>
      <h3>Your Favorite Cast</h3>
      <div className={style.castList}>
        {castData.slice(0,4).map((actor) => (
          <div key={actor.id} className={style.castItem}>
            <img src={actor.avatar} alt={actor.name} />
            <p>{actor.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cast;
