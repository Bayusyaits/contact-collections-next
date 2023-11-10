import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import { InputLabel, FormHelperText, Grid, Typography, ButtonGroup } from '@mui/material';
import Button from '@mui/material/Button';
import { Controller } from "react-hook-form";
import React from "react";
type BookListModalEditContactViewProps = {
  handleSubmit: any,
  handleSave: (payload: React.FormEvent<HTMLFormElement>) => void,
  handleCloseModal: () => void,
  setTotal: (val: number) => void,
  isDisabled?: boolean,
  loadingSubmit: boolean,
  total: number,
  control: any,
  errorMessage: string,
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
  error,
  errorMessage,
  setTotal,
  total,
  errors
}: BookListModalEditContactViewProps) => {
  const disabled = errorMessage && errorMessage.length ? true : false
  const formPhoneNumber = () => {
    let dom = []
    for (let i = 0; i < total; i++) {
      dom.push(
        <div key={i}>
          <InputLabel>Phone Number</InputLabel>
          <FormControl
            fullWidth
            key={i}
            variant="outlined"
            sx={{
              marginBottom: 2,
            }}
          >
            <ButtonGroup size="small" aria-label="small outlined button group">
              <Button disabled={total < 2} onClick={() => setTotal(total-1)}>-</Button>
              <Controller
                name={`field.phoneNumbers.${i}.phoneNumber`}
                defaultValue={''}
                control={control}
                render={({ field }: any) => (
                  <OutlinedInput
                    id={`book-detail-modal-create-phone_number_${i}`}
                    defaultValue="Small"
                    placeholder='08*******'
                    disabled={disabled}
                    variant={"standard"}
                    size="small"
                    sx={
                      {
                        width: '100%'
                      }
                    }
                    {...field}
                  />)
                }
              />
              {<Button disabled={total === 2} onClick={() => setTotal(total+1)}>+</Button>}
            </ButtonGroup>
          <FormHelperText error={true}>{errors.field?.phoneNumbers?.[i]?.phoneNumber?.message}</FormHelperText>
        </FormControl>
      </div>
      )
    }
    return (dom)
  }
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
                  disabled={disabled}
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
                  disabled={disabled}
                  size="small"
                  {...field}
                />)
              }
            />
            <FormHelperText error={true}>{errors.field?.email?.message}</FormHelperText>
          </FormControl>
          {
            formPhoneNumber()
          }
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
