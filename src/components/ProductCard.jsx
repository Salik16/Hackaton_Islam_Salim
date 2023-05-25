import * as React from "react";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "./ProductCard.css";

export default function ProductCard({ item }) {
  return (
    <div className="container">
      <Card className="cardMedia">
        <CardMedia
          sx={{ height: 500 }}
          image={item.image}
          title={item.title}
          component={Link}
          to={`/details/${item.id}`}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="body2"
            color={"black"}
            component="div"
          >
            {item.title}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}
