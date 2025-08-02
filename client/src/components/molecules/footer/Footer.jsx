import React from "react";
import style from "./Footer.module.scss";
import logo from "../../../assets/logo.png";
import appStore from "../../../assets/appStore.png";
import playStore from "../../../assets/googlePlay.png";
import {useNavigate} from "react-router"
const Footer = () => {
  
  const navigate = useNavigate();
  return (
    <footer className={style.footer}>
      {/* Top Row */}
      <div className={style.top}>
        <div className={style.column1}>
          <div className={style["footer-logo"]}>
            <img src={logo} alt={"brand-logo"} />
          </div>
          <p>
            Your ultimate destination for booking movie tickets online. Experience the magic of cinema with seamless booking, exclusive deals, and the latest blockbusters at your fingertips.
          </p>
          <div className={style["app-install"]}>
            <img src={playStore} alt={"playstore-logo"} />
            <img src={appStore} alt={"appstore-logo"} />
          </div>
        </div>
        <div className={style.column2}>
          <h3>Company</h3>

          <div>
            <a onClick={() => {navigate("/"); window.scrollTo({ top: 0, behavior: "smooth" });}}>Home</a>
            <a onClick={() => {navigate("/movies"); window.scrollTo({ top: 0, behavior: "smooth" });}}>Movies</a>
            <a>About us</a>
            <a>Contact us</a>
            <a>Privacy policy</a>
            <a>Terms & Condition</a>
          </div>
        </div>
        <div className={style.column2}>
          <h3>Get in touch</h3>

          <div>
            <a href="tel:+1-212-456-7890">+1-212-456-7890</a>
            <a href="mailto:contact@bookshow.com">contact@bookshow.com</a>
          </div>
        </div>
      </div>
      <hr />
      {/* Bottom Row */}
      <div className={style.subFooter}>Copyright 2025 ©️ BookShow. All Right Reserved.</div>
    </footer>
  );
};

export default Footer;