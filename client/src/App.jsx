import React from "react";
import { Route, Routes } from "react-router";
import Pages from "./pages/index.jsx";
import Layout from "./layout/Layout.jsx";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={3000}  hideProgressBar={false} theme="dark" />
      <Routes>
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
