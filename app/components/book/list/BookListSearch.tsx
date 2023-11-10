import React from "react";
import { Card, CardContent, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";

function BookListView({
  loading,
  orderBy,
  handleChangeSortBy,
  handleChangeSearch
}: any) {
  return (
    <>
      <Grid container spacing={2}
        sx={{
          marginBottom: '2rem'
        }}
      >
        <Grid item xs={6}>
          <FormControl fullWidth>
            <TextField
              id="book-list-slug"
              type="text"
              placeholder="Search"
              onChange={handleChangeSearch}
            />
          </FormControl>
        </Grid>
        <Grid item xs={6}>
        <FormControl fullWidth>
          <Select
            id="book-list-sortby"
            value={orderBy}
            disabled={loading}
            placeholder="Sort By"
            onChange={handleChangeSortBy}
          >
            <MenuItem value={'createdDate'}>Created Date</MenuItem>
            <MenuItem value={'fullName'}>Full Name</MenuItem>
          </Select>
        </FormControl>
        </Grid>
      </Grid>
    </>
  );
}

export default BookListView;
