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
import AccessoryList from "../components/AccesoryList";
import AddAccessoryPage from "../pages/AddAccessoryPage";
import AccessDetailsPage from "../pages/AccessDetailsPage";
import AccessEditPage from "../pages/AccessEditPage";

const MainRoutes = () => {
  const { user } = useAuth;
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/acessdetails/:id" element={<AccessDetailsPage />} />
        <Route path="/edit/:id" element={<EditPage />} />
        <Route path="/aceessEdit/:id" element={<AccessEditPage />} />
        <Route path="/add" element={<AddProductPage />} />
        <Route path="/addAcessory" element={<AddAccessoryPage />} />
        <Route path="/pay" element={<PayPage />} />
        <Route path="/fav" element={<FavPage />} />
        <Route path="/premium" element={<PremiumPage />} />
        <Route path="/accessory" element={<AccessoryList />} />
      </Route>
    </Routes>
  );
};

export default MainRoutes;
