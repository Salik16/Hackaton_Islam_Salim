import React, { useEffect, useState } from "react";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { notify } from "../components/Toastify";
import { useCart } from "../contexts/CartContextProvider";

const PayPage = () => {
  const { allDeleteFromCart } = useCart();
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    cardnumber: "",
    cv: "",
    name: "",
    email: "",
  });

  function pay() {
    notify("Спасибо за покупку"); 
  }

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
    navigate("/accessory");
    allDeleteFromCart();
    pay();
  }

  return (
    <div>
      <Typography variant="h3">Покупка Акссесуаров</Typography>
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
