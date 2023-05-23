import React from "react";

import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/Mainlayost";
import HomePage from "../components/HomePage";
import AuthPage from "../pages/AuthPage";
import CartPage from "../pages/CartPage";
import EditPage from "../pages/EditPage";
import DetailsPage from "../pages/DetailsPage";
import { useAuth } from "../contexts/AuthContextProvider";
import AddProductPage from "../pages/AddProductPage";
import PayPage from "../pages/PayPage";
import FavPage from "../pages/FavPage";
import PremiumPage from "../pages/PremiumPage";

const MainRoutes = () => {
  const { user } = useAuth;
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/add" element={<AddProductPage />} />
        <Route path="/pay" element={<PayPage />} />
        <Route path="/fav" element={<FavPage />} />
        <Route path="/premium" element={<PremiumPage />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
