import { Box, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import * as React from 'react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { availableSports } from '../const';
import { Facility } from '../models';

export const FacilityInfo: React.FC = () => {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext<Facility>();

  const [startWork, setStartWork] = useState<Date | null>(new Date(0, 0, 0, 8));
  const [endWork, setEndWork] = useState<Date | null>(new Date(0, 0, 0, 21));

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
        Basic information of facility
      </Typography>
      <SettingsSuggestIcon />
      <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column' }}>
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
          fullWidth
          {...register('sportType', {
            required: 'Sport type is required.',
          })}
          id="sportType"
          label="Sport Type"
          InputLabelProps={{ shrink: true }}
          autoFocus
          helperText={errors.sportType?.message}
          required
          defaultValue={getValues().sportType || 'football'}
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
          {...register('capacity', {
            required: 'Capacity is required.',
          })}
          required
          type="number"
          fullWidth
          defaultValue={10}
          InputLabelProps={{ shrink: true }}
          error={errors.facilityName !== undefined}
          id="capacity"
          helperText={errors.facilityName?.message}
          label="Capacity"
          autoFocus
        />
        <TextField
          margin="normal"
          {...register('price', {
            required: 'Price is required.',
          })}
          required
          type="number"
          fullWidth
          defaultValue={0}
          InputLabelProps={{ shrink: true }}
          error={errors.price !== undefined}
          id="price"
          helperText={errors.price?.message}
          label="Price"
          autoFocus
        />
        <TextField
          margin="normal"
          {...register('description')}
          fullWidth
          id="description"
          label="Description"
          InputLabelProps={{ shrink: true }}
          multiline
          autoFocus
          rows={4}
          maxRows={8}
        />
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            renderInput={props => (
              <TextField
                margin="normal"
                required
                fullWidth
                id="startWorkingHour"
                error={errors.startWorkingHour !== undefined}
                helperText={errors.startWorkingHour?.message}
                InputLabelProps={{ shrink: true }}
                {...props}
              />
            )}
            {...register('startWorkingHour', {
              required: 'Start working hour is required.',
            })}
            label="Start working hour"
            value={startWork}
            onChange={newValue => {
              setStartWork(newValue);
              setValue('startWorkingHour', newValue);
            }}
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <TimePicker
            renderInput={props => (
              <TextField
                margin="normal"
                required
                fullWidth
                id="endWorkingHour"
                error={errors.endWorkingHour !== undefined}
                helperText={errors.endWorkingHour?.message}
                InputLabelProps={{ shrink: true }}
                {...props}
              />
            )}
            {...register('endWorkingHour', {
              required: 'End working hour is required.',
            })}
            label="End working hour"
            value={endWork}
            onChange={newValue => {
              setEndWork(newValue);
              setValue('endWorkingHour', newValue);
            }}
          />
        </LocalizationProvider>
      </Box>
    </Grid>
  );
};
