import React from "react";
import style from "./Footer.module.scss";
import logo from "../../../assets/logo.png";
import appStore from "../../../assets/appStore.png";
import playStore from "../../../assets/googlePlay.png";
const Footer = () => {
  return (
    <footer className={style.footer}>
      {/* Top Row */}
      <div className={style.top}>
        <div className={style.column1}>
          <div className={style["footer-logo"]}>
            <img src={logo} alt={"brand-logo"} />
          </div>
          <p>
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
            unknown printer took a galley of type and scrambled it to make a type specimen book.
          </p>
          <div className={style["app-install"]}>
            <img src={playStore} alt={"playstore-logo"} />
            <img src={appStore} alt={"appstore-logo"} />
          </div>
        </div>
        <div className={style.column2}>
          <h3>Company</h3>

          <div>
            <a>Home</a>
            <a>About us</a>
            <a>Contact us</a>
            <a>Privacy policy</a>
            <a>Terms & Condition</a>
          </div>
        </div>
        <div className={style.column2}>
          <h3>Get in touch</h3>

          <div>
            <a>+1-212-456-7890</a>
            <a>contact@example.com</a>
          </div>
        </div>
      </div>
      <hr />
      {/* Bottom Row */}
      <div className={style.subFooter}>Copyright 2025 © GreatStack. All Right Reserved.</div>
    </footer>
  );
};

export default Footer;
