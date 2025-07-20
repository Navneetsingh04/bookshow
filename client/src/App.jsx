import React from "react";
import { Route, Routes } from "react-router";
import Pages from "./pages/index.jsx";
import Layout from "./layout/Layout.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Pages.Home />} />
        <Route path="movies" element={<Pages.MoviesPage />} />
        <Route path="movies/:id" element={<Pages.MovieDetails />} />
        <Route path="mybooking" element={<Pages.MyBooking />} />
      </Route>
    </Routes>
  );
}

export default App;
