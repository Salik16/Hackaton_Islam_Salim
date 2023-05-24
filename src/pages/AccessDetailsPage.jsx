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

const AccessDetailsPage = () => {
  const { oneProduct, getOneProduct } = useAccessory();

  const [value, setValue] = useState(4);
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
          <Box bgcolor={" #1976d2"}>
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
                <Typography>Raiting</Typography>
                <Rating
                  name="simple-controlled"
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                />
              </Box>
              <Button
                component={Link}
                to="/accessory"
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
