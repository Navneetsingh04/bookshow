import marvelLogo from "../../../../assets/marvelLogo.svg";
import style from "./Hero.module.scss";
import { Icon } from "@iconify/react/dist/iconify.js";
import Button from "../../../../components/atoms/buttons/Button";
import { useNavigate } from "react-router";
const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className={style.container}>
      <article>
        <img src={marvelLogo} alt="Marvel" />
        <h1>
          Avengers <br />
          Infinity War
        </h1>
        <p className={style.genres}>
          <span>Action | Adventure | Sci-Fi</span>
          <span>
            <Icon icon={"mdi:calendar"} />
            2018
          </span>
          <span>
            <Icon icon={"icon-park-outline:time"} />
            2h 8m
          </span>
        </p>
        <p className={style.description}>
          In a post-apocalyptic world where cities ride on wheels and consume
          each other to survive, two people meet in London and try to stop a
          conspiracy.
        </p>
        <Button
          className={style["button"]}
          text="Explore Movies"
          fIcon={"solar:arrow-right-linear"}
          clickHandler={() => navigate("/movies")}
        />
      </article>
    </section>
  );
};

export default Hero;
