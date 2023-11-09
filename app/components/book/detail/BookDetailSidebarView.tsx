import * as React from 'react';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { isEmpty } from 'lodash';
import { Box, Grid, Typography } from '@mui/material';
import { createUniqueKey } from 'utils/createUniqueKey'
import Button from '@mui/material/Button';

const BookListView = ({
  data, 
  error, 
  loading,
  handleAddCollection,
  handleAddContact
}: any) => {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message ? error.message : 'Error'}</p>;
  if (!data || !data.getBook || !data.getBook || isEmpty(data.getBook)) {
    return <></>;
  }
  const {collections} = data.getBook
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
        <List
          sx={{
            width: '100%',
            bgcolor: 'background.paper',
            position: 'relative',
            overflow: 'auto',
            maxHeight: 300,
            '& ul': { padding: 0 },
          }}
          subheader={<li />}
        >
          {
            collections && collections.length ? 
            collections.map((el: any) => (
              <Grid item key={createUniqueKey()} sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <ListSubheader>{ el }</ListSubheader>
              </Grid>
            )) : (<></>)
          }
        </List>
        <Button
          onClick={(e) => handleAddCollection(e)}
        >
          Add to Colection
        </Button>
        <Button
          onClick={(e) => handleAddContact(e)}
        >
          Create New Contact
        </Button>
      </Box>
    </Grid>
  );
}

export default BookListView