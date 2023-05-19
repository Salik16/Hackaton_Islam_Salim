import React from "react";

import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/Mainlayost";
import HomePage from "../components/HomePage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
