import React from "react";
import ErrorNotFound from 'components/error/not-found';
import { Chip, Grid, Paper, Button, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { isEmpty } from "lodash";
import { Container } from "@mui/system";
import { setSpaceToDash } from "helpers/mixins";

function BookListView({
  data, 
  error, 
  loading,
  openModalEditContact,
  openModalDeleteContact
}: any) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message ? error.message : 'Error'}</p>;
  if (!data || !data.getBook || !data.getBook || isEmpty(data.getBook)) {
    return <ErrorNotFound />;
  }
  const { 
    fullName, 
    email,
    uuid,
    slug,
    phoneNumbers,
    userUuid,
    bookCategories, 
    bookCollections,
  }: any = data.getBook
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    marginBottom: '2rem',
    color: theme.palette.text.secondary,
  }));
  return (
    <>
      <Container id={setSpaceToDash(fullName)}>
        <Grid container sx={{ height: '75vh' }}>
          <Grid item xs={12} sm={12} md={12}>
            <Item>
              <Typography component="h1" color="inherit">
               Contact
              </Typography>
            </Item>
            < TextField
              margin="normal"
              required
              fullWidth
              value={fullName}
              disabled={true}
              id={fullName}
              label="Full Name"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              value={email}
              disabled={true}
              id={email}
              label="Email Address"
            />
            {
              phoneNumbers.map((el: any) => (
                <TextField
                  key={el.phoneNumber}
                  margin="normal"
                  required
                  fullWidth
                  value={el.phoneNumber}
                  disabled={true}
                  id={el.phoneNumber}
                  label="Phone Number"
                />
              ))
            }
            <div style={{ display: 'flex'}}>
              {bookCategories && bookCategories.length ? 
                bookCategories.map(({ uuid: uuidc, categoryUuid}: any) => (
                <Grid
                  sx={{
                    marginRight: 1
                  }}
                  item 
                  key={uuidc}
                >
                  <Chip label={categoryUuid?.name || '-'} />
                </Grid>
                )) 
              : null}
            </div>
            <div style={{ display: 'flex'}}>
              {bookCollections && bookCollections.length ? 
                bookCollections.map(({ uuid: uuidc, collectionUuid}: any) => (
                <Grid 
                  item 
                  sx={{
                    marginRight: 1
                  }}
                  key={uuidc}
                >
                  <Chip label={collectionUuid?.name || '-'} />
                </Grid>
                )) 
              : null}
            </div>
            <Button
              fullWidth
              variant="contained"
              color="error"
              sx={{ mt: 5, mb: 1 }}
              onClick={() => openModalDeleteContact({
                uuid,
                fullName, 
                slug,
                phoneNumbers,
                userUuid
              })}
              disabled={loading}
            >
              Delete
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="info"
              sx={{  mb: 1 }}
              onClick={() => openModalEditContact({
                uuid,
                fullName, 
                slug,
                phoneNumbers,
                userUuid,
                email
              })}
              disabled={loading}
            >
              Edit
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default BookListView;
