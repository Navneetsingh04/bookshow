import React, { useEffect, useState } from "react";
import style from "./Details.module.scss";
import Star from "../../../../../assets/Star.png";
import Button from "../../../../../components/atoms/buttons/Button";
import { Icon } from "@iconify/react";
import { getMovie } from "../../../../../api/movies.js";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toggleWishlist, fetchWishlist } from "../../../../../store/actions/wishlist.actions";
import { toast } from "react-toastify";
import Cast from "./Cast.jsx";
import Booking from "../booking/Booking.jsx";

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [movie, setMovie] = useState();
  const [loading, setLoading] = useState(true);
  
  const { user } = useSelector((state) => state.user);
  const { wishlist } = useSelector((state) => state.wishlist);
  
  const isInWishlist = wishlist.find(item => item._id === movie?._id);

  const fetchMovie = async () => {
    try {
      const res = await getMovie(id);     
      setMovie(res.data);                
    } catch (error) {
      console.error("Failed to load movie", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchWishlist(user._id));
    }
  }, [user?._id, dispatch]);

  const handleBuyTicket = () => {
    const section = document.getElementById("dateSelect");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleWishlistToggle = () => {
    if (!user?._id) {
      toast.error("Please login to add to wishlist");
      return;
    }
    
    dispatch(toggleWishlist(movie));
    toast.success(isInWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  if (loading || !movie) return <div>Loading...</div>;

  const formattedDate = new Date(movie.releaseDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });


  return (
    <>
      <main className={style.container}>
        <article>
          {/* Left Image */}
          <img src={movie.thumbnailImage} alt={movie.title} />

          {/* Right Section */}
          <div className={style.details}>
            <p className={style.language}>
              {movie.languages?.[0]?.toUpperCase()}
            </p>
            <p className={style.title}>{movie.title}</p>
            <span className={style.rating}>
              <img src={Star} alt="rating" />
              {movie.rating} IMDb Rating
            </span>
            <p className={style.description}>{movie.description}</p>
            <p className={style.genres}>
              <span>{movie.duration}</span>
              <span>
                •{" "}
                {Array.isArray(movie.genres)
                  ? movie.genres.join(" | ")
                  : movie.genres}
              </span>
              <span>• {formattedDate}</span>
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
                clickHandler={handleBuyTicket}
              />
              <Icon 
                className={`${style["svg-heart"]} ${isInWishlist ? style["in-wishlist"] : ""}`} 
                icon={isInWishlist ? "fluent-emoji-flat:heart-suit" : "mdi-light:heart"} 
                onClick={handleWishlistToggle}
              />
            </div>
          </div>
        </article>

        <Cast />
      </main>
      <div id="dateSelect" className={style.dateSelect}>
        <Booking />
      </div>
    </>
  );
};

export default Details;
