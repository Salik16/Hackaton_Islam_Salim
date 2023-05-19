import React from "react";

import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/Mainlayost";
import HomePage from "../components/HomePage";
import AuthPage from "../pages/AuthPage";

const MainRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/cart" element={<CartPage />} /> */}
        <Route path="/auth" element={<AuthPage />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
