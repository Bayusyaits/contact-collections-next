import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { InputLabel, FormHelperText, Grid, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Controller } from "react-hook-form";
import React from "react";
type BookListModalEditContactViewProps = {
  handleSubmit: any,
  handleSave: (payload: React.FormEvent<HTMLFormElement>) => void,
  handleCloseModal: () => void,
  isDisabled?: boolean,
  loadingSubmit: boolean,
  errorMessage: string,
  control: any,
  errors: any,
  error: any
}
export const BookListModalEditContactView = ({
  handleSubmit,
  handleSave,
  handleCloseModal,
  isDisabled,
  control,
  loadingSubmit,
  errorMessage,
  error,
  errors
}: BookListModalEditContactViewProps) => {
  if (error) return <p>Error : {error.message ? error.message : 'Error'}</p>;
  return (
      <Grid
        container
        maxWidth={'lg'}
        width={'100%'}
        rowSpacing={3} 
        sx={{
          marginTop: 2
        }}
      >
        {
          errorMessage ? 
          (<Typography gutterBottom variant="small" component="div">
          {errorMessage}
          </Typography>) : (<></>)
        }
        <form
          onSubmit={handleSubmit(handleSave)}
          style={{
            width: '100%',
          }}
        >
          <FormControl
            fullWidth
            variant="outlined"
          >
            <InputLabel>Name</InputLabel>
            <Controller
              name="field.fullName"
              defaultValue={''}
              control={control}
              render={({ field }: any) => (
                <OutlinedInput
                  id="book-detail-modal-create-full_name"
                  label="Title"
                  disabled={errorMessage}
                  defaultValue="Small"
                  variant={"standard"}
                  size="small"
                  {...field}
                />)
              }
            />
            <FormHelperText error={true}>{errors.field?.name?.message}</FormHelperText>
          </FormControl>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{
              marginTop: 2,
            }}
          >
            <InputLabel>Phone Number</InputLabel>
            <Controller
              name="field.phoneNumber"
              defaultValue={''}
              control={control}
              render={({ field }: any) => (
                <OutlinedInput
                  id="book-detail-modal-create-phone_number"
                  label="Phone Number"
                  defaultValue="Small"
                  variant={"standard"}
                  disabled={errorMessage}
                  size="small"
                  {...field}
                />)
              }
            />
            <FormHelperText error={true}>{errors.field?.phoneNumber?.message}</FormHelperText>
          </FormControl>
          <FormControl
            fullWidth
            variant="outlined"
            sx={{
              marginTop: 2,
              marginBottom: 2,
            }}
          >
            <InputLabel>Email</InputLabel>
            <Controller
              name="field.email"
              defaultValue={''}
              control={control}
              render={({ field }: any) => (
                <OutlinedInput
                  id="book-detail-modal-create-email"
                  label="Email"
                  defaultValue="Small"
                  variant={"standard"}
                  disabled={errorMessage}
                  size="small"
                  {...field}
                />)
              }
            />
            <FormHelperText error={true}>{errors.field?.email?.message}</FormHelperText>
          </FormControl>
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
              !errorMessage ? (
                <Button
                  disabled={isDisabled || loadingSubmit}
                  type="submit"
                  variant={'contained'}
                  className="btn btn-prime py-3 px-5 w-full xl:w-50 xl:mr-3 align-top"
                  sx={{
                    marginTop: 2,
                  }}
                >
                  Submit
                </Button>
              ) : (<></>)
            }
          </div>
        </form>
      </Grid>
  );
};

export default BookListModalEditContactView;
