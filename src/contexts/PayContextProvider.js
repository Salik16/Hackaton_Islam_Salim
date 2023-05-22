import React, { createContext, useContext } from "react";
import { notify } from "../components/Toastify";
const payContext = createContext();
export const usePay = () => useContext(payContext);
const PayContextProvider = ({ children }) => {
  function pay() {
    notify("Спасибо за оформление подписки");
  }
  const values = {
    pay,
  };
  return <payContext.Provider value={values}>{children}</payContext.Provider>;
};

export default PayContextProvider;
