import React from "react";
import { FormControl, Grid, MenuItem, OutlinedInput, Select } from "@mui/material";

function BookListView({
  loading,
  loadingMore,
  orderBy,
  handleChangeSortBy,
  handleChangeSearch
}: any) {
  return (
    <>
      <Grid 
        container 
        rowSpacing={3} 
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}
        justifyContent="start"
        alignItems="start"
      >
        
        <Grid 
          sx={{
            position: 'relative'
          }}
          item lg={4} xl={4} xs={4} sm={4} md={4}>
          <input
            id="book-list-slug"
            type="text"
            onChange={handleChangeSearch}
          />
          <FormControl fullWidth>
            <Select
              labelId="book-list-label"
              id="book-list-sortby"
              value={orderBy}
              disabled={loadingMore || loading}
              label="Sort By"
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
