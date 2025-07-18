import React from "react";
import { Route, Routes } from "react-router";
import Pages from "./pages/Index.jsx";
import Layout from "./layout/Layout.jsx";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Pages.Home />} />
        <Route path="/:id" element={<Pages.MovieDetails />} />
      </Route>
    </Routes>
  );
}

export default App;
