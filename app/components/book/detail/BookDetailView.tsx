import React from "react";
import ErrorNotFound from 'components/error/not-found';
import { Chip, Grid, Paper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { isEmpty } from "lodash";
import { Box, Container } from "@mui/system";
import { setSpaceToDash } from "helpers/mixins";

function BookListView({
  data, 
  error, 
  loading,
}: any) {

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message ? error.message : 'Error'}</p>;
  if (!data || !data.getBook || !data.getBook || isEmpty(data.getBook)) {
    return <ErrorNotFound />;
  }
  const { 
    fullName, 
    email,
    description,
    bookCategories, 
    bookCollections,
  }: any = data.getBook
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  return (
    <>
      <Container id={setSpaceToDash(fullName)} maxWidth="md">
          <Grid container>
            <Grid item>
              <Box
                sx={{
                  position: 'relative',
                  pr: { md: 0 },
                }}
              >
                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                  {fullName}
                </Typography>
                <Grid container spacing={2} sx={{ marginBottom: 5 }}>
                  <Grid item xs={3}>
                    <Item>
                      <Typography component="small" color="inherit" gutterBottom>
                        Email: {email}
                      </Typography>
                    </Item>
                  </Grid>
                </Grid>
                <Typography 
                  variant="h5" 
                  color="inherit" 
                  paragraph
                >
                  {description}
                </Typography>
                <Grid 
                  container
                >
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
                </Grid>
                <Grid container sx={{
                  marginTop: 2
                }}>
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
                </Grid>
              </Box>
            </Grid>
          </Grid>
      </Container>
    </>
  );
}

export default BookListView;
