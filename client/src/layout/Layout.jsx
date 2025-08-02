import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import style from "./Layout.module.scss";
import Navbar from "../components/molecules/navbar/Navbar";
import Footer from "../components/molecules/footer/Footer";

const Layout = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [location.pathname]);
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
