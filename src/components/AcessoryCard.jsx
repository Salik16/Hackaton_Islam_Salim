import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AddShoppingCart } from "@mui/icons-material";
import { useCart } from "../contexts/CartContextProvider";
import { useAuth } from "../contexts/AuthContextProvider";
import { useFav } from "../contexts/FavoriteContextProvider";
import { useAccessory } from "../contexts/AccessoryContextProvider";

export default function AccessoryCard({ item }) {
  const { deleteProduct } = useAccessory();
  const { addProductToCart, isAlreadyInCart } = useCart();
  const { isAdmin } = useAuth();

  const { isAlreadyInFav, addToFavorite } = useFav();

  return (
    <Card
      sx={{
        maxWidth: 350,
        bgcolor: "#1976d2",
      }}
    >
      <CardMedia sx={{ height: 500 }} image={item.image} title={item.title} />
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
          ${item.price}
        </Typography>
      </CardContent>
      {isAdmin() ? (
        <CardActions>
          <Button
            size="small"
            sx={{ color: " rgb(214, 214, 214)" }}
            component={Link}
            to={`/acessdetails/${item.id}`}
          >
            Details
          </Button>
          <Button
            size="small"
            sx={{ color: " rgb(214, 214, 214)" }}
            component={Link}
            to={`/aceessEdit/${item.id}`}
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
            to={`/acessdetails/${item.id}`}
          >
            Details
          </Button>
          <IconButton
            onClick={() => addProductToCart(item)}
            sx={{
              color: `${
                isAlreadyInCart(item.id) ? "red" : "rgb(214, 214, 214)"
              }`,
              fontSize: "15px",
            }}
          >
            {`${isAlreadyInCart(item.id) ? "Remove From Cart" : "Add To Cart"}`}
            <AddShoppingCart />
          </IconButton>
          <IconButton
            onClick={() => addToFavorite(item)}
            sx={{
              color: `${
                isAlreadyInFav(item.id) ? "red" : " rgb(214, 214, 214)"
              }`,
            }}
          >
            <FavoriteIcon />
          </IconButton>
        </CardActions>
      )}
    </Card>
  );
}
