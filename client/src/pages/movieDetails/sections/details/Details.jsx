import React from "react";
import style from "./Details.module.scss";
import OIP1 from "../../../../assets/OIP1.png";
import Star from "../../../../assets/Star.png";
import Button from "../../../../components/atoms/buttons/Button";
import { Icon } from "@iconify/react";
import castData from "../../../../data/cast.json";

const Details = () => {

  const clickHandler = () => {
    console.log("Button clicked");
  };
  return (
    <main className={style.container}>
      <article>
        {/* Left Image */}
        <div>
          <img src={OIP1} alt="img1" />
        </div>

        {/* Right Section */}
        <div className={style.details}>
          <p className={style.language}>ENGLISH</p>
          <p className={style.title}>Guardians of the Galaxy</p>
          <span className={style.rating}>
            <img src={Star} alt="rating" />
            4.5 IMDb Rating
          </span>
          <p className={style.description}>
            From the Marvel Cinematic Universe comes an epic space adventure. Peter Quill, a brash space adventurer who calls himself Star-Lord, finds himself the target of relentless bounty hunters after stealing a mysterious orb. To evade capture, he forms an uneasy alliance with a group of misfits: Gamora, Drax the Destroyer, Rocket Raccoon, and Groot.
          </p>
          <p className={style.genre}>
            <span>2h 19m</span>
            <span>, Action | Adventure | Sci-Fi</span>
            <span>, 1 May, 2005</span>
          </p>
          <div className={style.actions}>
            <Button
            className={style["watch-trailer-btn"]}
              text="Watch Trailer"
              bIcon="octicon:play-16"
              clickHandler={clickHandler}
            />
            <Button 
            className={style["buy-ticket-btn"]}
            text="Buy Ticket" clickHandler={clickHandler} />
            <Icon className={style["svg-heart"]}icon="mdi-light:heart" />
          </div>
        </div>
      </article>
      
        {/* Cast */}
        <div className={style.cast}>
          <h3>Your Favorite Cast</h3>
          <div className={style.castList}>
            {castData.slice(0, 6).map((actor, index) => (
              <div key={actor.id} className={style.castItem}>
                <img src={actor.avatar} alt={actor.name} />
                <p>{actor.name}</p>
              </div>
            ))}
          </div>
        </div>
    </main>
  );
};

export default Details;
