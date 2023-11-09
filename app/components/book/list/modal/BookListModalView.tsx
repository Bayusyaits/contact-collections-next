import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormHelperText, Grid, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import { Controller } from "react-hook-form";
import React from "react";
type ViewListModalViewProps = {
  handleSubmit: any,
  handleSave: (payload: React.FormEvent<HTMLFormElement>) => void,
  handleSwitchModal: () => void,
  loading?: boolean,
  isDisabled?: boolean,
  collections: CollectionProps[],
  control: any,
  errors: any,
  error: any
}
type CollectionProps = {
  id: string,
  slug: string,
  uuid: string,
  name: string,
  image: string
}
export const ViewListModalView = ({
  handleSubmit,
  handleSave,
  handleSwitchModal,
  isDisabled,
  loading,
  collections,
  control,
  error,
  errors
}: ViewListModalViewProps) => {
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
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
        <form
          onSubmit={handleSubmit(handleSave)}
          style={{
            width: '100%',
          }}
        >
          <FormControl
            fullWidth
            variant="outlined"
            disabled={!collections || collections.length == 0}
          >
            <InputLabel>Collections</InputLabel>
            <Controller
              name="field.collections"
              defaultValue={''}
              control={control}
              render={({ field }: any) => (
                <Select
                  labelId="demo-multiple-name-label"
                  id="book-detail-modal-collections"
                  multiple
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                  {...field}
                >
                  { collections && collections.length ? collections.map((el: CollectionProps) => (
                      <MenuItem
                        key={el.id}
                        value={el.uuid}
                      >
                        {el.name}
                      </MenuItem>
                    )) : (<></>)}
                </Select>)
              }
            />
            <FormHelperText error={true}>{errors.field?.collections?.message}</FormHelperText>
          </FormControl>
          <div
            style={{
              display: 'flex',
              justifyContent: 'end'
            }}
          >
            <Button
              disabled={loading || isDisabled}
              type="button"
              onClick={handleSwitchModal}
              variant={'outlined'}
              className="btn btn-secondary py-3 px-5 w-full xl:w-50 xl:mr-3 align-top"
              sx={{
                marginTop: 2,
                marginRight: 1,
              }}
            >
              Create Collection
            </Button>
            <Button
              disabled={loading || isDisabled || !collections || collections.length == 0}
              type="submit"
              variant={'contained'}
              className="btn btn-prime py-3 px-5 w-full xl:w-50 xl:mr-3 align-top"
              sx={{
                marginTop: 2,
              }}
            >
              Add to Collection
            </Button>
          </div>
        </form>
      </Grid>
  );
};

export default ViewListModalView;
