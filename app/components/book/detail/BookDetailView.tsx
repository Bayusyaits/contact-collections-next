import React from "react";
import ErrorNotFound from 'components/error/not-found';
import { CardMedia, Chip, Grid, Paper, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { isEmpty } from "lodash";
import { Box, Container } from "@mui/system";
import StarIcon from '@mui/icons-material/Star';

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
    id, 
    name, 
    description,
    image, 
    bookCategories, 
    bookCollections,
    publishDate, 
  }: any = data.getBook
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const starIcon = (val: number) => {
    const arr = []
    const num = val && val < 5 ? val : 5
    for (let i = 0; i < num; i++) {
      arr.push(<StarIcon fontSize="small" key={i}></StarIcon>)
    }
    return (arr)
  }
  return (
    <>
      <Container id={id} maxWidth="md">
          <CardMedia
            component="img"
            image={`${image}`}
            alt={name}
          />
          <Grid container>
            <Grid item>
              <Box
                sx={{
                  position: 'relative',
                  pr: { md: 0 },
                }}
              >
                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                  {name}
                </Typography>
                <Grid container spacing={2} sx={{ marginBottom: 5 }}>
                  <Grid item xs={3}>
                    <Item>
                      <Typography component="small" color="inherit" gutterBottom>
                        Publish Date: {publishDate}
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
