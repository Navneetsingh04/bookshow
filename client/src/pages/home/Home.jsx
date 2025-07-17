import React from "react";
import style from "./home.module.scss";
import Hero from "./section/hero/Hero.jsx";
import Movies from "./section/movies/Movies.jsx";
import Trailer from "./section/trailer/Trailer.jsx";
const Home = () => {
  return (
    <>
      <main className={style.container}>
        <Hero />
        <Movies />
        <Trailer />
      </main>
    </>
  );
};

export default Home;
