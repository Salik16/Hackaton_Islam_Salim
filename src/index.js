import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Toastify from "./components/Toastify";
import ProductsContextProvider from "./contexts/ProductsContextProvider";
import CartContextProvider from "./contexts/CartContextProvider";
import AuthContextProvider from "./contexts/AuthContextProvider";
import FavoriteContextProvider from "./contexts/FavoriteContextProvider";
import AccessoryContextProvider from "./contexts/AccessoryContextProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartContextProvider>
        <FavoriteContextProvider>
          <AuthContextProvider>
            <AccessoryContextProvider>
              <ProductsContextProvider>
                <Toastify />
                <App />
              </ProductsContextProvider>
            </AccessoryContextProvider>
          </AuthContextProvider>
        </FavoriteContextProvider>
      </CartContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
