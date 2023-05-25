import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../contexts/ProductsContextProvider";
import { useAccessory } from "../contexts/AccessoryContextProvider";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AddShoppingCart } from "@mui/icons-material";
import { useCart } from "../contexts/CartContextProvider";
import { useAuth } from "../contexts/AuthContextProvider";
import { useFav } from "../contexts/FavoriteContextProvider";

const AccessDetailsPage = () => {
  const { oneProduct, getOneProduct } = useAccessory();
  const { deleteProduct } = useAccessory();
  const { addProductToCart, isAlreadyInCart } = useCart();
  const { isAdmin } = useAuth();

  const { isAlreadyInFav, addToFavorite } = useFav();

  const params = useParams();
  useEffect(() => {
    getOneProduct(params.id);
  }, []);

  return (
    <div>
      {oneProduct ? (
        <Card sx={{ display: "flex" }}>
          <CardMedia
            component="img"
            sx={{ width: 350 }}
            image={oneProduct.image}
            title={oneProduct.image}
          />
          <Box>
            <CardContent>
              <Typography gutterBottom variant="h3" component="div">
                {oneProduct.title}
              </Typography>
              <Typography variant="h5" color="text.secondary">
                {oneProduct.description}
              </Typography>
              <Typography variant="h5">${oneProduct.price}</Typography>
            </CardContent>

            <CardActions sx={{ display: "block" }}>
              <Box>
                {isAdmin() ? (
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: " black" }}
                      component={Link}
                      to={`/comicsEdit/${oneProduct.id}`}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      sx={{ color: "black" }}
                      onClick={() => deleteProduct(oneProduct.id)}
                    >
                      Delete
                    </Button>
                    <IconButton
                      onClick={() => addProductToCart(oneProduct)}
                      sx={{
                        color: `${
                          isAlreadyInCart(oneProduct.id) ? "red" : "black"
                        }`,
                      }}
                    >
                      <AddShoppingCart />
                    </IconButton>
                  </CardActions>
                ) : (
                  <CardActions>
                    <IconButton
                      onClick={() => addProductToCart(oneProduct)}
                      sx={{
                        color: `${
                          isAlreadyInCart(oneProduct.id) ? "red" : "black"
                        }`,
                        fontSize: "15px",
                      }}
                    >
                      {`${
                        isAlreadyInCart(oneProduct.id)
                          ? "Remove From Cart"
                          : "Add To Cart"
                      }`}
                      <AddShoppingCart />
                    </IconButton>
                  </CardActions>
                )}
              </Box>
              <Button
                component={Link}
                to="/comics"
                size="small"
                sx={{
                  bgcolor: "rgb(214, 214, 214)",
                  color: "black",
                }}
              >
                Exit To The Main Page
              </Button>
            </CardActions>
          </Box>
        </Card>
      ) : (
        <h1>Loading...</h1>
      )}
    </div>
  );
};

export default AccessDetailsPage;
