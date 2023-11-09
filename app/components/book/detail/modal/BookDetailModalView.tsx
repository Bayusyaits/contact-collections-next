import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { FormHelperText, Grid, InputLabel } from '@mui/material';
import Button from '@mui/material/Button';
import { Controller } from "react-hook-form";
import React from "react";
type ViewDetailModalViewProps = {
  handleSubmit: any,
  handleChangeCollection: any,
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
  uuid: string,
  slug: string,
  name: string,
  image: string
}

const initValue = (value: any, scope: 'uuid') => {
  let arr = []
  if (value && Array.isArray(value) && value.length && value[0].collectionUuid) {
    arr = value.map((el) => el?.collectionUuid?.uuid)
  } else if (value && Array.isArray(value) && value.length) {
    arr = value
  }
  return arr
}
export const ViewDetailModalView = ({
  handleSubmit,
  handleSave,
  handleChangeCollection,
  handleSwitchModal,
  isDisabled,
  loading,
  collections,
  control,
  error,
  errors
}: ViewDetailModalViewProps) => {
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
              name="field.bookCollections"
              defaultValue={''}
              control={control}
              render={({ field: {
                value,
                onChange,
                ...render
              } }: any) => (
                <Select
                  labelId="demo-multiple-name-label"
                  id="book-detail-modal-collections"
                  multiple
                  input={<OutlinedInput label="Name" />}
                  MenuProps={MenuProps}
                  value={initValue(value, 'uuid')}
                  onChange={handleChangeCollection}
                  {...render}
                >
                  { collections && collections.length ? collections.map((el: CollectionProps) => (
                      <MenuItem
                        key={el.uuid}
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
              Submit Collection
            </Button>
          </div>
        </form>
      </Grid>
  );
};

export default ViewDetailModalView;
