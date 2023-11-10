import React from "react";
import ErrorNotFound from 'components/error/not-found';
import Button from '@mui/material/Button';
import { Card, CardActionArea, CardContent, Chip, Grid, Pagination, Typography } from "@mui/material";
import Link from "next/link";

function BookListView({
  data, 
  error, 
  loading,
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
          data.getBooks.items.map(({ 
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
              item lg={4} xl={4} xs={4} sm={4} md={4} key={uuid}>
              <Card>
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
                      overflow: 'hidden'
                    }}
                  >
                    <Link
                        id={`card-book--${slug}`}
                        href={`/book/${slug}`}
                        title="Account"
                        className="footer-icon-wrap font-weight-normal btn-transparent d-flex flex-column text-center align-items-center cursor-pointer small text-gray"
                      >
                    <Typography gutterBottom variant="h5" component="div">
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
                      : '-'}
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
                      : '-'}
                    </Grid>
                    <Button 
                      variant="outline"
                      id={`btn-delete-${uuid}`}
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
                      variant="outline"
                      id={`btn-edit-${uuid}`}
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
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        }
      </Grid>
      <Grid 
        container 
        rowSpacing={1} 
        columnSpacing={{ xs: 1, sm: 2, md: 3, lg: 3 }}
        justifyContent="center"
        alignItems="start"
        sx={{
          marginTop: 5
        }}
      >
          <Pagination count={Math.ceil(Math.abs(data.getBooks.total / data.getBooks.limit))} page={data.getBooks.offset + 1} onChange={handlePagination} />
      </Grid>
    </>
  );
}

export default BookListView;
