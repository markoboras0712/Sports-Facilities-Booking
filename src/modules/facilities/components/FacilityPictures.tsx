import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { authSelectors } from 'modules/authentication';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { Facility } from '../models';

export const FacilityPictures: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Facility>();

  const user = useRecoilValue(authSelectors.user);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
        Pictures
      </Typography>
      <AddAPhotoIcon />
      <Box sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          {...register('email')}
          InputLabelProps={{ shrink: true }}
          fullWidth
          error={errors.email !== undefined}
          id="email"
          defaultValue={user?.email}
          helperText={errors.email?.message}
          label="Email address"
          autoFocus
        />
      </Box>
    </Grid>
  );
};
