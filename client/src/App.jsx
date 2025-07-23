import React from "react";
import { Route, Routes } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import Pages from "./pages/Index.jsx";
import Layout from "./layout/Layout.jsx";
import { ToastContainer } from "react-toastify";
import LoginPopup from "./popups/Login.jsx";
import RegisterPopup from "./popups/Register.jsx";
import Modal from "./components/molecules/Modal/Modal.jsx";
import {closeLoginPopup, closeRegisterPopup } from "./store/slices/popUpSlice.js";

function App() {
  const dispatch = useDispatch();
  const { loginPopup, registerPopup } = useSelector((state) => state.popup);

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} theme="dark" />
      
      {/* Login Modal */}
      <Modal isOpen={loginPopup} onClose={() => dispatch(closeLoginPopup())}>
        <LoginPopup />
      </Modal>

      {/* Register Modal */}
      <Modal isOpen={registerPopup} onClose={() => dispatch(closeRegisterPopup())}>
        <RegisterPopup />
      </Modal>

      <Routes>
        <Route />
        <Route path="/" element={<Layout />}>
          <Route index element={<Pages.Home />} />
          <Route path="movies" element={<Pages.MoviesPage />} />
          <Route path="movies/:id" element={<Pages.MovieDetails />} />
          <Route path="mybooking" element={<Pages.MyBooking />} />
          <Route path="seat-selection" element={<Pages.SeatSelection />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
