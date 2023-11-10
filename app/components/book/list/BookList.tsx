import React from "react";
import ErrorNotFound from 'components/error/not-found';
import Button from '@mui/material/Button';
import { Card, CardActionArea, CardActions, CardContent, Chip, Grid, Pagination, Typography } from "@mui/material";
import Link from "next/link";

function BookListView({
  data, 
  error, 
  loading,
  limit,
  page,
  take,
  openModalDeleteContact,
  openModalEditContact,
  handlePagination,
  handleChange
}: any) {

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message ? error.message : 'Error'}</p>;
  if (!data || !data.getBooks || 
    !data.getBooks.items || data.getBooks.items.length === 0) {
    return <ErrorNotFound />;
  }
  const {getBooks} = data
  return (
    <>
      <Grid 
        container 
        rowSpacing={3} 
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}
        justifyContent="start"
        alignItems="start"
      >
        {
          getBooks.items.map(({ 
            uuid,
            fullName, 
            slug,
            phoneNumbers,
            email,
            userUuid,
            bookCollections,
            bookCategories
          }: any, k: number) => (
            <Grid 
              sx={{
                position: 'relative'
              }}
              item lg={4} xl={4} xs={12} sm={6} md={6} key={uuid}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <input
                  className="form-control"
                  type={'checkbox'}
                  id={`field-books--${k}`}
                  onChange={() => handleChange(uuid)}
                  value={uuid}
                  style={{
                    position: 'absolute',
                    zIndex: 10
                  }}
                />
                <CardActionArea>
                  <CardContent
                    sx={{ 
                      overflow: 'hidden',
                      flexGrow: 1
                    }}
                  >
                    <Link
                      id={`card-book--${slug}`}
                      href={`/book/${slug}`}
                      title="Account"
                      style={{
                        textDecoration: 'none',
                        color: '#242526'
                      }}
                      >
                    <Typography gutterBottom variant="h5" component="h2">
                      {fullName}
                    </Typography>
                    <Typography variant="body2" component="div">
                      {email}
                    </Typography>
                    </Link>
                    {
                      phoneNumbers.map(({phoneNumber}: any) => {
                        return (
                          <Typography
                            variant="body2"
                            key={phoneNumber}
                            component="div"
                            sx={{
                              marginRight: '0.5rem'
                            }}
                          >
                            {phoneNumber}
                           </Typography>
                        )
                      })
                    }
                    <Grid
                      item
                      sx={{
                        display: 'flex',
                        marginTop: 1
                      }}
                      justifyContent={'start'}
                      alignContent={'center'}
                      columnSpacing={1}
                      rowSpacing={1}
                    >
                      {bookCategories && bookCategories.length ? 
                        bookCategories.map(({categoryUuid, uuid}: any) => (
                          categoryUuid?.name ? (<Grid item key={uuid}>
                          <Chip label={categoryUuid.name} sx={{ marginRight: 2 }} /></Grid>) : 
                          (<div key={uuid}></div>)
                        )) 
                      : ''}
                    </Grid>
                    <Grid
                      item
                      sx={{
                        display: 'flex',
                        marginTop: 1
                      }}
                      justifyContent={'start'}
                      alignContent={'center'}
                      columnSpacing={1}
                      rowSpacing={1}
                    >
                      {bookCollections && bookCollections.length ? 
                        bookCollections.map(({collectionUuid, uuid}: any) => (
                          collectionUuid?.name ? (<Grid item key={uuid}>
                          <Chip label={collectionUuid.name} sx={{ marginRight: 2 }} /></Grid>) : 
                          (<div key={uuid}></div>)
                        )) 
                      : ''}
                    </Grid>
                  </CardContent>
                  <CardActions
                    sx={{
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Button 
                      variant="contained" 
                      color="error"
                      id={`btn-delete-${uuid}`}
                      sx={{
                        marginBottom: '0.5rem',
                        width: '100%',
                        display: 'block'
                      }}
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
                      variant="outlined" 
                      color="info"
                      id={`btn-edit-${uuid}`}
                      onClick={() => openModalEditContact({
                        uuid,
                        fullName, 
                        slug,
                        phoneNumbers,
                        userUuid,
                        email
                      })}
                      sx={{
                        marginBottom: '0.75rem',
                        width: '100%',
                        display: 'block'
                      }}
                      disabled={loading}
                    >
                      Edit
                    </Button>
                  </CardActions>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        }
      </Grid>
      {
        getBooks?.total >  limit && (<Grid 
          container 
          rowSpacing={1} 
          columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}
          justifyContent="center"
          alignItems="start"
          sx={{
            marginTop: 5
          }}
        >
            <Pagination
              count={Math.ceil(Math.abs(data.getBooks.total / take))}
              page={page}
              onChange={handlePagination} 
            />
        </Grid>)
      }
    </>
  );
}

export default BookListView;
