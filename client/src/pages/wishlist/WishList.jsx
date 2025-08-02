import React, { useEffect } from "react";
import style from "./WishList.module.scss";
import Button from "../../components/atoms/buttons/Button";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchWishlist,
  toggleWishlist,
} from "../../store/actions/wishlist.actions";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";

const WishList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { wishlist, loading } = useSelector((state) => state.wishlist);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchWishlist(user._id));
    }
  }, [user?._id, dispatch]);

  const handleRemoveFromWishlist = (movie) => {
    dispatch(toggleWishlist(movie));
    toast.success("Removed from wishlist");
  };

  if (loading) return <div className={style.loading}>Loading wishlist...</div>;

  return (
    <main className={style.container}>
      <h1 className={style.title}>My Wishlist</h1>

      {wishlist.length ? (
        <div className={style.movies}>
          {wishlist.map((movie) => (
            <div key={movie._id} className={style.movie}>
              <img
                src={movie.thumbnailImage}
                alt={movie.title}
                className={style.poster}
              />
              <div className={style.info}>
                <p className={style.language}>
                  {movie.languages[0].toUpperCase()
                }
                </p>
                <h2 className={style.movieTitle}>{movie.title}</h2>
                <p className={style.movieDescription}>{movie.description}</p>
                <div className={style.movieDetails}>
                  <span>{movie.duration}</span>
                  <span>
                    •{" "}
                    {Array.isArray(movie.genres)
                      ? movie.genres.join(" | ")
                      : movie.genres}
                  </span>
                  <span>
                    •{" "}
                    {movie.releaseDate
                      ? new Date(movie.releaseDate).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : ""}
                  </span>
                </div>
                <div className={style.actions}>
                  <Button
                    className={style["watch-trailer-btn"]}
                    text="Watch Trailer"
                    bIcon="octicon:play-16"
                  />
                  <Button
                    className={style["buy-ticket-btn"]}
                    text="Buy Ticket"
                    clickHandler={() => navigate(`/movies/${movie._id}`)}
                  />
                  <Icon
                    icon="mdi:heart"
                    className={style.removeIcon}
                    onClick={() => handleRemoveFromWishlist(movie)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={style.emptyState}>
          <Icon icon="mdi:heart-outline" className={style.emptyIcon} />
          <h2 className={style.emptyMessage}>Your wishlist is empty!</h2>
          <p className={style.emptyDescription}>
            Browse movies and add them to your wishlist to see them here.
          </p>
          <Button
            text="Browse Movies"
            clickHandler={() => navigate("/movies")}
            className={style.browseBtn}
          />
        </div>
      )}
    </main>
  );
};

export default WishList;
