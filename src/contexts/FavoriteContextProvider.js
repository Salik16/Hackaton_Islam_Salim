import React, { createContext } from "react";
import { json } from "react-router-dom";
import { ACTIONS } from "../const";

const favContext = createContext();

const INIT_STATE = {
  products: [],
  favLenght: 0,
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case ACTIONS.favLenght:
      return { ...state, favLenght: action.payload };
  }
}

function getFavFromLS() {
  let data = JSON.parse(localStorage.getItem("favorite"));
  if (!fav) {
    data = {
      products: [],
      totalPrice: 0,
    };
    return data;
  }
}

const FavoriteContextProvider = ({ children }) => {
  return <favContext.Provider>{children}</favContext.Provider>;
};

export default FavoriteContextProvider;
