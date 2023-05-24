import React, { useEffect } from "react";

import { Link } from "react-router-dom";
import { useFav } from "../contexts/FavoriteContextProvider";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Grid, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { AddShoppingCart } from "@mui/icons-material";

const FavPage = () => {
  const { favorite, getFav } = useFav();

  useEffect(() => {
    getFav();
  }, []);

  const { isAlreadyInFav, addToFavorite } = useFav();
  const favorites = favorite.products;

  return (
    <Grid container spacing={2}>
      {favorites.map((item) => (
        <Grid item key={item.id} md={4} sm={6}>
          {" "}
          <Card sx={{ maxWidth: 350, bgcolor: "#1976d2" }}>
            <CardMedia
              sx={{ height: 400 }}
              image={item.image}
              title={item.title}
            />
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
              <Button
                size="small"
                sx={{ color: " rgb(214, 214, 214)" }}
                component={Link}
                to={`/details/${item.id}`}
              >
                Details
              </Button>
            </CardContent>
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
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default FavPage;
