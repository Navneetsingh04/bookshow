import React, { useEffect, useState } from "react";
import style from "./Cast.module.scss";
import { getCast } from "../../../../../api/movies";
import { useParams } from "react-router";

const Cast = () => {
  const { id } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCast = async () => {
    try {
      const res = await getCast(id);
      if (Array.isArray(res.data)) {
        setCast(res.data);
      } else {
        setCast([]);
      }
    } catch (error) {
      console.error("Failed to load cast", error);
      setCast([]); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCast();
  }, [id]);

  return (
    <div className={style.cast}>
      <h3>Your Favorite Cast</h3>

      {loading ? (
        <p>Loading cast...</p>
      ) : (
        <div className={style.castList}>
          {cast.length === 0 ? (
            <p>No cast information available.</p>
          ) : (
            cast.map((actor, index) => (
              <div key={actor.id || index} className={style.castItem}>
                <img
                  src={actor.avatar}
                  alt={actor.name}
                />
                <h4>{actor.character }</h4>
                <p>{actor.name}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Cast;
