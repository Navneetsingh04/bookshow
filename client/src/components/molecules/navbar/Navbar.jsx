import React from "react";
import logo from "../../../assets/logo.png";
import { Icon } from "@iconify/react";
import style from "./Navbar.module.scss";
import Button from "../../atoms/buttons/Button";
const Navbar = () => {
  const handleLogin = () => {
    console.log("Login button clicked");
  };

  return (
    <article className={style.navbar}>
      {/* left side */}
      <img src={logo} alt="logo" />

      {/* Middle  */}
       <nav className={style.nav}>
        <a>Home</a>
        <a>Movies</a>
        <a>Theaters</a>
        <a>Releases</a>
      </nav>

      {/* right side */}
      <div className={style.right}>
      <Icon icon={"ic:outline-search"}/>
      <Button text="Login" clickHandler={handleLogin} />
      </div>
    </article>
  );
};

export default Navbar;
