import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

import { useAccessory } from "../contexts/AccessoryContextProvider";

const AddAccessoryPage = () => {
  const { addProduct } = useAccessory();

  const [formValue, setFormValue] = useState({
    title: "",
    description: "",
    price: "",

    image: "",
  });

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
      !formValue.price.trim() ||
      !formValue.image.trim()
    ) {
      alert("fill the fields");
      return;
    }

    addProduct(formValue);
  };

  return (
    <div style={{ backgroundColor: "black" }}>
      <h1 style={{ textalign: "center" }}>Add Accessory</h1>
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
          value={formValue.price}
          onChange={(e) => handleChange(e)}
          name="price"
          label="Price"
          variant="outlined"
        />

        <TextField
          value={formValue.image}
          onChange={(e) => handleChange(e)}
          name="image"
          label="Image"
          variant="outlined"
        />

        <Button type="submit">Send Product</Button>
      </form>
    </div>
  );
};

export default AddAccessoryPage;
