import React, { useEffect } from "react";

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

const DetailsPage = () => {
  const { oneProduct, getOneProduct } = useProduct();
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
            sx={{ width: 300 }}
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
            <iframe
              width="700"
              height="400"
              src={oneProduct.trailer}
              title={oneProduct.title}
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>

            <CardActions>
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
