import React, { useEffect, useState } from "react";

import { Box, Button, TextField } from "@mui/material";

import { useNavigate } from "react-router-dom";
import { notify } from "../components/Toastify";
import { useCart } from "../contexts/CartContextProvider";
import { useAuth } from "../contexts/AuthContextProvider";
const PayPage = () => {
  const { allDeleteFromCart } = useCart();

  function pay() {
    notify("Спасибо за оформление подписки");
  }
  const { isUser } = useAuth();

  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    cardnumber: "",
    cv: "",
    name: "",
    email: "",
  });

  function handleChange(e) {
    let obj = {
      ...formValue,
      [e.target.name]: e.target.value,
    };
    setFormValue(obj);
  }

  function getSubscription() {
    if (
      !formValue.cardnumber.trim() ||
      !formValue.name.trim() ||
      !formValue.cv.trim() ||
      !formValue.email.trim()
    ) {
      alert("fill the fields");
      return;
    }
    navigate("/");
    allDeleteFromCart();
    isUser();
    pay();
  }

  return (
    <div>
      <h1>Оформление Подписки</h1>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <img
          src="https://etk21.ru/pictures/cards/sberbank.png"
          alt="Bank Cart"
        />

        <Box sx={{ width: 400 }}>
          {" "}
          <TextField
            value={formValue.cardnumber}
            onChange={(e) => handleChange(e)}
            margin="normal"
            required
            fullWidth
            id="number"
            label="CardNumber "
            name="cardnumber"
            autoFocus
          />
          <TextField
            onChange={(e) => handleChange(e)}
            value={formValue.cv}
            margin="normal"
            required
            fullWidth
            id=""
            label="CVC/CVV"
            name="cv"
            autoFocus
          />
          <TextField
            onChange={(e) => handleChange(e)}
            value={formValue.name}
            margin="normal"
            required
            fullWidth
            id=""
            label="Name"
            name="name"
            autoFocus
          />
          <TextField
            onChange={(e) => handleChange(e)}
            value={formValue.email}
            margin="normal"
            required
            fullWidth
            id=""
            label="Email Address"
            name="email"
            autoFocus
          />
          <Button onClick={() => getSubscription()} variant="contained">
            Pay
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default PayPage;
