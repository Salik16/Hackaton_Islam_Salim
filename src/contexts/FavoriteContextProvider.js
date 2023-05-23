import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS, calcSubFav } from "../const";
import { notify } from "../components/Toastify";

const favContext = createContext();

export const useFav = () => useContext(favContext);

const INIT_STATE = {
  favorite: { products: [] },
  favLength: 0,
};

function reducer(state = INIT_STATE, action) {
  switch (action.type) {
    case ACTIONS.favLength:
      return { ...state, favLength: action.payload };
    case ACTIONS.favorite:
      return { ...state, favorite: action.payload };
    default:
      return state;
  }
}
function getFavFromLS() {
  let fav = JSON.parse(localStorage.getItem("favorite"));
  if (!fav) {
    fav = {
      products: [],
    };
  }
  return fav;
}

const FavoriteContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  function getFav() {
    const data = getFavFromLS();
    let len = data.products.reduce((acc, item) => acc + +item.count, 0);

    dispatch({
      type: ACTIONS.favorite,
      payload: data,
    });
    dispatch({
      type: ACTIONS.favLength,
      payload: len,
    });
  }
  function changeProductCount(count, id) {
    const fav = getFavFromLS();
    fav.products = fav.products.map((product) => {
      if (product.id === id) {
        product.count = count;
      }

      return product;
    });
  }

  changeProductCount();

  const isAlreadyInFav = (id) => {
    const fav = getFavFromLS();

    const isInFav = fav.products.some((item) => item.id === id);
    return isInFav;
  };

  function deleteFavorite(id) {
    const data = getFavFromLS();

    data.products = data.products.filter((item) => item.id !== id);

    localStorage.setItem("favorite", JSON.stringify(data));
    getFav();
    notify("Successfuly removed from favorite");
  }
  function addToFavorite(product) {
    let fav = getFavFromLS();

    const isInFav = fav.products.some((item) => item.id === product.id);
    if (isInFav) {
      deleteFavorite(product.id);
      return;
    } else {
      fav.products.push({ ...product, count: 1 });
    }

    localStorage.setItem("favorite", JSON.stringify(fav));
    getFav();
    notify("Successfuly added to favorite");
  }

  let values = {
    favorite: state.favorite,
    favLength: state.favLength,
    getFav,
    addToFavorite,
    deleteFavorite,
    isAlreadyInFav,
    changeProductCount,
  };

  return <favContext.Provider value={values}>{children}</favContext.Provider>;
};

export default FavoriteContextProvider;
