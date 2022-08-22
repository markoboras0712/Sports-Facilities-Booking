import { Box, Grid, MenuItem, TextField } from '@mui/material';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { availableSports } from '../const';
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
        <TextField
          margin="normal"
          select
          {...register('sportType', {
            required: 'Sport type is required.',
          })}
          id="sportType"
          label="Sport Type"
          fullWidth
          InputLabelProps={{ shrink: true }}
          autoFocus
          helperText={errors.sportType?.message}
          required
          defaultValue=""
          error={errors.sportType !== undefined}
        >
          {availableSports.map((sport, index) => (
            <MenuItem key={index} value={sport}>
              {sport[0].toUpperCase() + sport.substring(1)}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          margin="normal"
          {...register('startWorkingHour', {
            required: 'Start working hour is required.',
          })}
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={errors.facilityName !== undefined}
          id="startWorkingHour"
          helperText={errors.facilityName?.message}
          label="Start Working Hour"
          autoFocus
        />
        <TextField
          margin="normal"
          {...register('endWorkingHour', {
            required: 'End working hour is required.',
          })}
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={errors.facilityName !== undefined}
          id="endWorkingHour"
          helperText={errors.facilityName?.message}
          label="End Working Hour"
          autoFocus
        />
        <TextField
          margin="normal"
          {...register('capacity', {
            required: 'Capacity is required.',
          })}
          required
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={errors.facilityName !== undefined}
          id="capacity"
          helperText={errors.facilityName?.message}
          label="Capacity"
          autoFocus
        />
      </Box>
    </Grid>
  );
};
