import React, { useEffect } from "react";
import { useProduct } from "../contexts/ProductsContextProvider";
import ProductList from "./ProductList";

const HomePage = () => {
  return (
    <div>
      <ProductList />
    </div>
  );
};

export default HomePage;
