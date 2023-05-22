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

  const addProduct = async (newProduct) => {
    try {
      await axios.post(API, newProduct);
    } catch (error) {
      console.log(error);
    }
  };

  async function deleteProduct(id) {
    try {
      await axios.delete(`${API}/${id}`);
      getProduct();
    } catch (error) {
      console.log(error);
    }
  }

  async function getOneProduct(id) {
    try {
      let res = await axios.get(`${API}/${id}`);
      dispatch({
        type: ACTIONS.oneProduct,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function editProduct(obj, id) {
    try {
      await axios.patch(`${API}/${id}`, obj);
    } catch (error) {
      console.log(error);
    }
  }

  let values = {
    oneProduct: state.oneProduct,
    products: state.products,
    pageTotalCount: state.pageTotalCount,
    getProduct,
    addProduct,
    deleteProduct,
    getOneProduct,
    editProduct,
  };

  return (
    <productContext.Provider value={values}>{children}</productContext.Provider>
  );
};

export default ProductsContextProvider;
