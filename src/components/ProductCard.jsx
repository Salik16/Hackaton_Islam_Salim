import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useProduct } from "../contexts/ProductsContextProvider";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import { AddShoppingCart } from "@mui/icons-material";
import { useCart } from "../contexts/CartContextProvider";
import { useAuth } from "../contexts/AuthContextProvider";

export default function ProductCard({ item }) {
  const { deleteProduct } = useProduct();
  const { addProductToCart, isAlreadyInCart, deleteFromCart } = useCart();
  const { isAdmin } = useAuth();

  return (
    <Card sx={{ maxWidth: 350, bgcolor: "#1976d2" }}>
      <CardMedia sx={{ height: 400 }} image={item.image} title={item.title} />
      <CardContent>
        <Typography
          gutterBottom
          variant="h5"
          color={" rgb(214, 214, 214)"}
          component="div"
        >
          {item.title}
        </Typography>
        <Typography variant="body2" color={" rgb(214, 214, 214)"}>
          {item.price}
        </Typography>
      </CardContent>
      {isAdmin() ? (
        <CardActions>
          <Button
            size="small"
            sx={{ color: " rgb(214, 214, 214)" }}
            component={Link}
            to={`/details/${item.id}`}
          >
            Details
          </Button>
          <Button
            size="small"
            sx={{ color: " rgb(214, 214, 214)" }}
            component={Link}
            to={`/edit/${item.id}`}
          >
            Edit
          </Button>
          <Button
            size="small"
            sx={{ color: " rgb(214, 214, 214)" }}
            onClick={() => deleteProduct(item.id)}
          >
            Delete
          </Button>
          <IconButton
            onClick={() => addProductToCart(item)}
            sx={{ color: `${isAlreadyInCart(item.id) ? "red" : "black"}` }}
          >
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      ) : (
        <CardActions>
          <Button
            size="small"
            sx={{ color: "black" }}
            component={Link}
            to={`/details/${item.id}`}
          >
            Details
          </Button>
          <IconButton
            onClick={() => addProductToCart(item)}
            sx={{ color: `${isAlreadyInCart(item.id) ? "red" : "black"}` }}
          >
            Add To Cart
            <AddShoppingCart />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
}
