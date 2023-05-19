import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS, API, LIMIT } from "../const";
import axios from "axios";

const productContext = createContext();
export const useProduct = () => useContext(productContext);

let INIT_STATE = {
  products: [],
  oneProduct: null,
  pageTotalCount: 1,
};

function reducer(state = INIT_STATE, aciton) {
  switch (aciton.type) {
    case ACTIONS.products:
      return { ...state, products: aciton.payload };
    case ACTIONS.oneProduct:
      return { ...state, oneProduct: aciton.payload };
    case ACTIONS.pageTotalCount:
      return { ...state, pageTotalCount: aciton.payload };
    default:
      return state;
  }
}

const ProductsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  async function getProduct() {
    try {
      let res = await axios(
        `${API}${window.location.search || `?_limit=${LIMIT}`}`
      );
      const totalPages = Math.ceil(res.headers["x-total-count"] / LIMIT);
      dispatch({
        type: ACTIONS.products,
        payload: res.data,
      });
      dispatch({
        type: ACTIONS.pageTotalCount,
        payload: totalPages,
      });
    } catch (error) {
      console.log(error);
    }
  }

  const values = {
    getProduct,
    pageTotalCount: state.pageTotalCount,
    products: state.products,
  };

  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductsContextProvider;
