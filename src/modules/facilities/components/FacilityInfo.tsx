import { Box, Grid, TextField } from '@mui/material';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { Facility } from '../models';

export const FacilityInfo: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Facility>();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          {...register('facilityName', {
            required: 'Facility name is required.',
          })}
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={errors.facilityName !== undefined}
          id="facilityName"
          helperText={errors.facilityName?.message}
          label="Facility Name"
          autoFocus
        />
      </Box>
    </Grid>
  );
};
