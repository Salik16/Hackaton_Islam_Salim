import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import { useProduct } from "../contexts/ProductContextProvider";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { useCart } from "../contexts/CartContextProvider";
import { useProduct } from "../contexts/ProductsContextProvider";

export default function ProductCard({ item }) {
  const { deleteProduct } = useProduct();
  const { addProductToCart, isAlreadyInCart, deleteFromCart } = useCart();

  return (
    <Card sx={{ maxWidth: 345, bgcolor: "black" }}>
      <CardMedia sx={{ height: 140 }} image={item.image} title={item.title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {item.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/details/${item.id}`}>
          Details
        </Button>
        <Button size="small" component={Link} to={`/edit/${item.id}`}>
          Edit
        </Button>
        <Button size="small" onClick={() => deleteProduct(item.id)}>
          Delete
        </Button>
        <IconButton
          onClick={() => addProductToCart(item)}
          color={isAlreadyInCart(item.id) ? "error" : "primary"}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  );
}
