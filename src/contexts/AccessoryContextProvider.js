import React, { createContext, useContext, useReducer } from "react";
import { ACTIONS, API, ACCESSORY, LIMIT } from "../const";
import axios from "axios";

const accessoryContext = createContext();
export const useAccessory = () => useContext(accessoryContext);

let INIT_STATE = {
  accessory: [],
  oneProduct: null,
  pageTotalCount: 1,
};

function reducer(state = INIT_STATE, aciton) {
  switch (aciton.type) {
    case ACTIONS.accessory:
      return { ...state, accessory: aciton.payload };
    case ACTIONS.oneProduct:
      return { ...state, oneProduct: aciton.payload };
    case ACTIONS.pageTotalCount:
      return { ...state, pageTotalCount: aciton.payload };
    default:
      return state;
  }
}

const AccessoryContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INIT_STATE);

  async function getProduct() {
    try {
      let res = await axios(
        `${ACCESSORY}${window.location.search || `?_limit=${LIMIT}`}`
      );
      const totalPages = Math.ceil(res.headers["x-total-count"] / LIMIT);
      dispatch({
        type: ACTIONS.accessory,
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
      await axios.post(ACCESSORY, newProduct);
    } catch (error) {
      console.log(error);
    }
  };

  async function deleteProduct(id) {
    try {
      await axios.delete(`${ACCESSORY}/${id}`);
      getProduct();
    } catch (error) {
      console.log(error);
    }
  }

  async function getOneProduct(id) {
    try {
      let res = await axios.get(`${ACCESSORY}/${id}`);
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
      await axios.patch(`${ACCESSORY}/${id}`, obj);
    } catch (error) {
      console.log(error);
    }
  }

  let values = {
    oneProduct: state.oneProduct,
    accessory: state.accessory,
    pageTotalCount: state.pageTotalCount,
    getProduct,
    addProduct,
    deleteProduct,
    getOneProduct,
    editProduct,
  };

  return (
    <accessoryContext.Provider value={values}>
      {children}
    </accessoryContext.Provider>
  );
};

export default AccessoryContextProvider;
