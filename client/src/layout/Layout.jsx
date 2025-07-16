import React from "react";
import { Outlet } from "react-router-dom";
import style from "./Layout.module.scss";
import Navbar from "../components/molecules/navbar/Navbar";
import Footer from "../components/molecules/footer/Footer";
const Layout = () => {
  return (
    <div className={style.conatiner}>
      {/* Header */}
        <Navbar />
      {/* Outlet */}
      <Outlet />
      {/* Footer */}
      {/* <Footer/> */}
    </div>
  );
};

export default Layout;
