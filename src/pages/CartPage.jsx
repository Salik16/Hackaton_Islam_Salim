import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useCart } from "../contexts/CartContextProvider";
import {
  Alert,
  AlertTitle,
  Box,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
const CartPage = () => {
  const { cart, getCart, changeProductCount, deleteFromCart } = useCart();
  useEffect(() => {
    getCart();
  }, []);

  return (
    <div>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="center">Count</TableCell>
            <TableCell>SubPrice</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.products.map((row) => (
            <TableRow key={row.id}>
              <TableCell>
                <img src={row.image} alt={row.image} width={30} />
              </TableCell>
              <TableCell>{row.title}</TableCell>
              <TableCell>${row.price}</TableCell>
              <TableCell>{row.category}</TableCell>
              <TableCell align="center">
                <input
                  type="number"
                  value={row.count}
                  onChange={(e) => changeProductCount(e.target.value, row.id)}
                  min={1}
                  max={100}
                  style={{ backgroundColor: "rgb(214, 214, 214)" }}
                />
              </TableCell>
              <TableCell>{row.subPrice}</TableCell>
              <TableCell>
                <IconButton onClick={() => deleteFromCart(row.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Typography variant="h5">TotalPrice:{cart.totalPrice}</Typography>
        <Button variant="contained" component={Link} to={"/pay"}>
          Buy
        </Button>
      </Box>
    </div>
  );
};

export default CartPage;
