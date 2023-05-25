import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";

export default function AccessoryCard({ item }) {
  return (
    <Card>
      <CardMedia
        className="cardMedia"
        sx={{ height: 500 }}
        image={item.image}
        title={item.title}
        component={Link}
        to={`/acessdetails/${item.id}`}
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
  );
}
