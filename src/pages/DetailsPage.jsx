import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { useProduct } from "../contexts/ProductsContextProvider";

import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useCart } from "../contexts/CartContextProvider";
import { useAuth } from "../contexts/AuthContextProvider";
import { useFav } from "../contexts/FavoriteContextProvider";
import { hover } from "@testing-library/user-event/dist/hover";

const DetailsPage = () => {
  const { oneProduct, getOneProduct } = useProduct();

  const params = useParams();
  useEffect(() => {
    getOneProduct(params.id);
  }, []);

  let data = JSON.parse(localStorage.getItem("users"));
  const { deleteProduct } = useProduct();
  const { addProductToCart, isAlreadyInCart } = useCart();
  const { isAdmin } = useAuth();

  const { isAlreadyInFav, addToFavorite } = useFav();

  return (
    <div>
      {oneProduct ? (
        <Card>
          <Box bgcolor={"rgb(214, 214, 214)"}>
            <Box sx={{ display: "flex" }}>
              <CardMedia
                component="img"
                image={oneProduct.image}
                title={oneProduct.image}
                sx={{ marginTop: "20px", height: 500 }}
              />
              <Box>
                <CardContent>
                  <Typography gutterBottom variant="h3" component="div">
                    {oneProduct.title}
                  </Typography>
                  <Typography variant="h5" color="text.secondary">
                    {oneProduct.description}
                  </Typography>
                </CardContent>
                {!data || !data.subscr ? (
                  <iframe
                    width="700"
                    height="400"
                    src={oneProduct.trailer}
                    title={oneProduct.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video src={oneProduct.film} controls width={600}></video>
                )}
              </Box>
            </Box>

            <CardActions sx={{ display: "flex" }}>
              {isAdmin() ? (
                <CardActions>
                  <Button
                    size="small"
                    sx={{ color: "black" }}
                    component={Link}
                    to={`/edit/${oneProduct.id}`}
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
                </CardActions>
              ) : (
                <CardActions>
                  <Button
                    size="small"
                    sx={{ color: "black" }}
                    component={Link}
                    to={`/details/${oneProduct.id}`}
                  >
                    Details
                  </Button>

                  <IconButton
                    onClick={() => addToFavorite(oneProduct)}
                    sx={{
                      color: `${
                        isAlreadyInFav(oneProduct.id)
                          ? "red"
                          : " rgb(214, 214, 214)"
                      }`,
                    }}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </CardActions>
              )}

              <Button
                component={Link}
                to="/"
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

export default DetailsPage;
