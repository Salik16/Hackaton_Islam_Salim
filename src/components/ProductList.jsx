import React, { useEffect, useState } from "react";

// import ProductCard from "./ProductCard";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useSearchParams } from "react-router-dom";
import { LIMIT } from "../const";
import { useProduct } from "../contexts/ProductsContextProvider";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const { products, getProduct, pageTotalCount } = useProduct();
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "all"
  );

  useEffect(() => {
    if (category === "all") {
      setSearchParams({
        q: search,
        _page: 1,
        _limit: LIMIT,
      });
    } else {
      setSearchParams({
        q: search,
        category: category,
        _page: 1,
        _limit: LIMIT,
      });
    }
  }, [search, category]);

  useEffect(() => {
    if (category === "all") {
      setSearchParams({
        q: search,
        _page: page,
        _limit: LIMIT,
      });
    } else {
      setSearchParams({
        q: search,
        category: category,
        _page: page,
        _limit: LIMIT,
      });
    }
  }, [page]);

  useEffect(() => {
    getProduct();
  }, [searchParams]);

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    if (pageTotalCount < page) {
      setPage(pageTotalCount);
    }
  }, [pageTotalCount]);

  return (
    <div>
      <Box
        sx={{
          maxWidth: 300,
          margin: "20px auto",
          display: "flex",
          gap: "30px",
          color: "white",
        }}
      >
        <TextField
          label="Search..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <FormControl fullWidth>
          <InputLabel color="warning" id="demo-simple-select-label">
            <Typography sx={{ color: "black" }}>Category</Typography>
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="Age"
            onChange={(e) => setCategory(e.target.value)}
            sx={{ color: "black" }}
          >
            <MenuItem value={"all"}>All</MenuItem>
            <MenuItem value={"electronics"}>Electronics</MenuItem>
            <MenuItem value={"jewelery"}>Jewelery</MenuItem>
            <MenuItem value={"books"}>Books</MenuItem>
            <MenuItem value={"women's clothing"}>Women's clothing</MenuItem>
            <MenuItem value={"men's clothing"}>Men's clothing</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2}>
        {products.map((item) => (
          <Grid key={item.id} item md={4} sm={6} sx={12}>
            <ProductCard item={item} key={item.id} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ maxWidth: "max-content", margin: "30px auto" }}>
        <Pagination
          page={page}
          count={pageTotalCount}
          onChange={(e, p) => setPage(p)}
          color="action"
        />
      </Box>
    </div>
  );
};

export default ProductList;
