import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { useProduct } from "../contexts/ProductsContextProvider";

const EditPage = () => {
  const { oneProduct, getOneProduct, editProduct } = useProduct();
  const params = useParams();
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState({
    title: "",
    description: "",

    category: "",
    image: "",
    trailer: "",
  });

  useEffect(() => {
    getOneProduct(params.id);
  }, []);

  useEffect(() => {
    if (oneProduct) {
      setFormValue(oneProduct);
    }
  }, [oneProduct]);

  const handleChange = (e) => {
    let obj = {
      ...formValue,
      [e.target.name]: e.target.value,
    };
    setFormValue(obj);
  };

  const handleSumbit = (e) => {
    e.preventDefault();
    if (
      !formValue.title.trim() ||
      !formValue.description.trim() ||
      !formValue.image.trim() ||
      !formValue.trailer.trim()
    ) {
      alert("fill the fields");
      return;
    }

    editProduct(formValue, params.id);
    navigate("/");
  };

  return (
    <div>
      <h1 style={{ textalign: "center" }}>Edit Product</h1>
      <form
        onSubmit={(e) => handleSumbit(e)}
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <TextField
          value={formValue.title}
          onChange={(e) => handleChange(e)}
          name="title"
          label="Title"
          variant="outlined"
        />
        <TextField
          value={formValue.description}
          onChange={(e) => handleChange(e)}
          name="description"
          label="Description"
          variant="outlined"
        />
        <TextField
          value={formValue.trailer}
          onChange={(e) => handleChange(e)}
          name="trailer"
          label="Trailer"
          variant="outlined"
        />

        <TextField
          value={formValue.image}
          onChange={(e) => handleChange(e)}
          name="image"
          label="Image"
          variant="outlined"
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Category"
            name="category"
            value={formValue.category}
            onChange={(e) => handleChange(e)}
          >
            <MenuItem value={"драма"}>Драма</MenuItem>
            <MenuItem value={"боевик"}>Боевик</MenuItem>
            <MenuItem value={"вестерн"}>Вестерн</MenuItem>
            <MenuItem value={"триллер"}>Триллер</MenuItem>
            <MenuItem value={"экшн"}>Экшэн</MenuItem>
            <MenuItem value={"военный"}>Военный</MenuItem>
            <MenuItem value={"комедия"}>Комедия</MenuItem>
            <MenuItem value={"ужасы"}>Ужасы</MenuItem>
            <MenuItem value={"приключения"}>Приключения</MenuItem>
            <MenuItem value={"научная фантастика"}>Научная Фантастика</MenuItem>
            <MenuItem value={"анимация"}>Анимация</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit">Send Product</Button>
      </form>
    </div>
  );
};

export default EditPage;
