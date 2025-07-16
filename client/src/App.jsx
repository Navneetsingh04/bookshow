import React from "react";
import { Route, Routes } from "react-router";
import Pages from "./pages/Index.jsx";
import Layout from "./layout/layout.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Pages.Home />} />
      </Route>
    </Routes>
  );
}

export default App;
