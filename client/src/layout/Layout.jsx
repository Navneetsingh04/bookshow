import React from "react";
import { Outlet } from "react-router";
import style from "./Layout.module.scss";
import Navbar from "../components/molecules/navbar/Navbar";
import Footer from "../components/molecules/footer/Footer";
const Layout = () => {
  return (
    <main className={style.container}>
      {/* Header */}
      <Navbar />
      {/* Outlet */}
        <Outlet />
      {/* Footer */}
      <Footer/>
    </main>
  );
};

export default Layout;
