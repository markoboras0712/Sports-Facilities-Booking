import { Box, Grid, TextField, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { OnboardingData } from 'modules/authentication';

export const Address: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<OnboardingData>();
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography component="h1" variant="h5">
        Address
      </Typography>
      <HomeIcon />
      <Box sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          {...register('address', {
            required: 'Address is required.',
          })}
          required
          fullWidth
          error={errors.address !== undefined}
          id="address"
          helperText={errors.address?.message}
          label="Address"
          autoFocus
        />
        <TextField
          margin="normal"
          {...register('country', {
            required: 'Country is required.',
          })}
          required
          fullWidth
          error={errors.country !== undefined}
          id="country"
          helperText={errors.country?.message}
          label="Country"
          autoFocus
        />
        <TextField
          margin="normal"
          {...register('city', {
            required: 'City is required.',
          })}
          required
          fullWidth
          error={errors.city !== undefined}
          id="city"
          helperText={errors.city?.message}
          label="City"
          autoFocus
        />
        <TextField
          margin="normal"
          {...register('postalCode')}
          fullWidth
          id="postalCode"
          label="Postal Code"
          autoFocus
        />
      </Box>
    </Grid>
  );
};
