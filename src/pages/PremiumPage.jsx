import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { notify } from "../components/Toastify";
import { ACTIONS } from "../const";

const PremiumPage = () => {
  const navigate = useNavigate();
  const [formValue, setFormValue] = useState({
    cardnumber: "",
    cv: "",
    name: "",
    email: "",
  });

  function pay() {
    let data = JSON.parse(localStorage.getItem("users"));
    data.subscr = true;
    localStorage.setItem("users", JSON.stringify(data));
    notify("Спасибо за подиску", "Приятного просмотра");
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
    navigate("/");
    pay();
  }

  return (
    <div style={{ backgroundColor: "white" }}>
      <Typography variant="h3">Оформление Подписки</Typography>
      <Typography variant="body2">
        Добро пожаловать на наш сайт о фильмах! Мы рады представить вам нашу
        эксклюзивную премиум подписку, которая откроет вам мир уникальных
        возможностей и привилегий. Премиум подписка на нашем сайте предназначена
        для настоящих киноманов, которые хотят получить максимальное
        удовольствие от своего опыта просмотра фильмов. Вот некоторые
        преимущества, которые вы получите с нашей премиум подпиской:
        Безограниченный доступ к нашей библиотеке фильмов: Получите
        неограниченный доступ к огромному количеству фильмов различных жанров,
        включая блокбастеры, классику кинематографа, независимое кино и многое
        другое. Вы сможете наслаждаться любимыми фильмами в любое время и в
        любом месте.
      </Typography>
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
            label="CardNumber"
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

export default PremiumPage;
