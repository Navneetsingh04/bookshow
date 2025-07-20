import React from "react";
import logo from "../../../assets/logo.png";
import { Icon } from "@iconify/react";
import style from "./Navbar.module.scss";
import Button from "../../atoms/buttons/Button";
import { NavLink, useNavigate } from "react-router";
const Navbar = () => {
  const handleLogin = () => {
    console.log("Login button clicked");
  };
  const navigate = useNavigate();

  return (
    <article className={style.navbar}>
      {/* left side */}
      <img src={logo} alt="logo" />

      {/* Middle  */}
      <nav className={style.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? style.active : "")}
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) => (isActive ? style.active : "")}
        >
          Movies
        </NavLink>
        <NavLink>Theaters</NavLink>
        <NavLink>Releases</NavLink>
      </nav>

      {/* right side */}
      <div className={style.right}>
        <Icon icon={"ic:outline-search"} />
        <Button text="Login" clickHandler={handleLogin} />
      </div>
    </article>
  );
};

export default Navbar;
