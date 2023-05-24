import React, { useEffect, useState } from "react";

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

import AccessoryCard from "./AcessoryCard";
import { useAccessory } from "../contexts/AccessoryContextProvider";

const AccessoryList = () => {
  const { accessory, getProduct, pageTotalCount } = useAccessory();
  const [searchParams, setSearchParams] = useSearchParams();

  const [page, setPage] = useState(1);
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
          position: "relative",
          left: "35%",
        }}
      >
        <TextField
          label="Search..."
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          color="primary"
          sx={{ color: "yellow" }}
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
            <MenuItem value={"all"}>Все</MenuItem>
            <MenuItem value={"драма"}>Драма</MenuItem>
            <MenuItem value={"боевик"}>Боевик</MenuItem>
            <MenuItem value={"вестерн"}>Вестерн</MenuItem>
            <MenuItem value={"триллер"}>Триллер</MenuItem>
            <MenuItem value={"экшн"}>Экшэн</MenuItem>
            <MenuItem value={"военный"}>Военный</MenuItem>
            <MenuItem value={"комедия"}>Комедия</MenuItem>
            <MenuItem value={"ужасы"}>Ужасы</MenuItem>
            <MenuItem value={"приключения"}>Приключения</MenuItem>
            <MenuItem value={"научная фантастика"}>Научная Фантастика</MenuItem>
            <MenuItem value={"анимация"}>Анимация</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2}>
        {accessory.map((item) => (
          <Grid key={item.id} item md={4} sm={6}>
            <AccessoryCard item={item} key={item.id} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ maxWidth: "max-content", margin: "30px auto" }}>
        <Pagination
          page={page}
          count={pageTotalCount}
          onChange={(e, p) => setPage(p)}
          color="primary"
        />
      </Box>
    </div>
  );
};

export default AccessoryList;
