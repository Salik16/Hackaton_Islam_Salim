import React, { useEffect } from "react";
import { useProduct } from "../contexts/ProductsContextProvider";
import ProductList from "./ProductList";

const HomePage = () => {
  return (
    <div className="homePage">
      <ProductList />
    </div>
  );
};

export default HomePage;
