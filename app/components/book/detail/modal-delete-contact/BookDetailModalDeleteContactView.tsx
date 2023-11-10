import { Typography, Grid } from '@mui/material';
import Button from '@mui/material/Button';
import React from "react";
type BookDetailModalDeleteContactViewProps = {
  handleSave: () => void,
  handleCloseModal: () => void,
  isDisabled?: boolean,
  loadingSubmit: boolean,
  errorMessage: string,
  payload: {
    fullName: string,
    phoneNumber: string
    slug: string
    uuid: string
  }
}
export const BookDetailModalDeleteContactView = ({
  handleSave,
  handleCloseModal,
  isDisabled,
  loadingSubmit,
  errorMessage,
  payload,
}: BookDetailModalDeleteContactViewProps) => {
  return (
      <Grid
        container
        maxWidth={'lg'}
        width={'100%'}
        rowSpacing={3} 
        sx={{
          marginTop: 2,
          display: 'block',
          width: '100%'
        }}
      >
        <div
            style={{
              display: 'flex',
              flexDirection: 'column'
            }}
          >
          <Typography 
            variant="h6" 
            color="inherit" 
            paragraph
          >
            {
            !errorMessage ?
              `Apakah Anda yakin ingin menghapus contact ${payload.fullName}?`
              : errorMessage
            }
          </Typography>
          <div
              style={{
                display: 'flex',
                justifyContent: 'end'
              }}
            >
              <Button
                disabled={isDisabled || loadingSubmit}
                type="button"
                onClick={handleCloseModal}
                variant={'outlined'}
                className="btn btn-secondary py-3 px-5 w-full xl:w-50 xl:mr-3 align-top"
                sx={{
                  marginTop: 2,
                  marginRight: 1,
                }}
              >
                Cancel
              </Button>
              {
                !errorMessage ?
                (<Button
                disabled={isDisabled || loadingSubmit}
                onClick={handleSave}
                type="submit"
                variant={'contained'}
                className="btn btn-prime py-3 px-5 w-full xl:w-50 xl:mr-3 align-top"
                sx={{
                  marginTop: 2,
                }}
              >
                Submit
              </Button>) : (<></>)}
            </div>
          </div>
      </Grid>
  );
};

export default BookDetailModalDeleteContactView;
