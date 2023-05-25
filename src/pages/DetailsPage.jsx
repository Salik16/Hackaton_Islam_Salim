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
import { useAuth } from "../contexts/AuthContextProvider";

import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useCart } from "../contexts/CartContextProvider";

import { useFav } from "../contexts/FavoriteContextProvider";

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
            <Box className="details" sx={{ display: "flex" }}>
              <CardMedia
                component="img"
                image={oneProduct.image}
                title={oneProduct.image}
                sx={{
                  marginTop: "20px",
                  height: "50%",
                  width: "30%",
                  marginLeft: "20px",
                }}
              />
              <Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {oneProduct.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    width={"100%"}
                    color="text.secondary"
                  >
                    {oneProduct.description}
                  </Typography>
                </CardContent>
                {!data || !data.subscr ? (
                  <iframe
                    className="trailer"
                    width="100%"
                    height="70%"
                    src={oneProduct.trailer}
                    title={oneProduct.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    className="video"
                    src={oneProduct.film}
                    controls
                    width="100%"
                  ></video>
                )}
              </Box>
            </Box>

            <CardActions sx={{ display: "flex", alignItems: "flex-end" }}>
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
                  <IconButton
                    onClick={() => addToFavorite(oneProduct)}
                    sx={{
                      color: `${
                        isAlreadyInFav(oneProduct.id) ? "red" : "black"
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
