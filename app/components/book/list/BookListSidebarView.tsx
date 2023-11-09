import * as React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';

type BookListSidebar = {
  values: any
  openModalAddCollection: () => void
  openModalAddContact: () => void
}

const BookListSidebarView = ({
  values,
  openModalAddCollection,
  openModalAddContact
}: BookListSidebar) => {
  return (
    <Grid 
      container 
      justifyContent="start"
      alignItems="start"
    >
      <Box
        sx={{
          maxWidth: 360
        }}
      >
        <Typography component="h5" variant="h5" color="inherit" gutterBottom>
          Koleksi
        </Typography>
        <Button
          disabled={!values || values.length == 0}
          onClick={() => openModalAddCollection()}
        >
          Add to Colection
        </Button>
        <Button
          onClick={() => openModalAddContact()}
        >
          Create New Contact
        </Button>
      </Box>
    </Grid>
  );
}

export default BookListSidebarView