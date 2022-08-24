import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { authSelectors } from 'modules/authentication';
import { AvatarData } from 'modules/authorization';
import { MuiTelInput } from 'mui-tel-input';
import * as React from 'react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { availableSports } from '../const';
import { Facility } from '../models';
import { FacilityMediaCard } from './FacilityMediaCard';

interface Props {
  avatarPhoto?: AvatarData;
}

export const FacilityPreview: React.FC<Props> = () => {
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
  } = useFormContext<Facility>();
  const user = useRecoilValue(authSelectors.user);

  const [startWork, setStartWork] = useState<Date | null>(new Date(0, 0, 0, 8));
  const [endWork, setEndWork] = useState<Date | null>(new Date(0, 0, 0, 21));
  const [number, setNumber] = useState('');

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
        Facility Preview
      </Typography>
      <RemoveRedEyeIcon />
      <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column' }}>
        <FacilityMediaCard />

        <Box sx={{ mt: 1, display: 'flex' }}>
          <TextField
            margin="normal"
            {...register('facilityName', {
              required: 'Facility name is required.',
            })}
            sx={{ mr: 2, width: '50%' }}
            required
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
            sx={{ width: '50%' }}
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
        </Box>
        <Box sx={{ mt: 1, display: 'flex' }}>
          <TextField
            margin="normal"
            {...register('capacity', {
              required: 'Capacity is required.',
            })}
            type="number"
            sx={{ width: '50%', mr: 2 }}
            defaultValue={10}
            InputLabelProps={{ shrink: true }}
            error={errors.capacity !== undefined}
            id="capacity"
            helperText={errors.capacity?.message}
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
            sx={{ width: '50%' }}
            InputLabelProps={{ shrink: true }}
            error={errors.price !== undefined}
            id="price"
            helperText={errors.price?.message}
            label="Price"
            autoFocus
          />
        </Box>

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
        <Box sx={{ mt: 1, display: 'flex' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <TimePicker
              renderInput={props => (
                <TextField
                  margin="normal"
                  required
                  sx={{ mr: 2, width: '50%' }}
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
                  sx={{ width: '50%' }}
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
        <TextField
          margin="normal"
          {...register('website')}
          fullWidth
          InputLabelProps={{ shrink: true }}
          error={errors.website !== undefined}
          id="website"
          helperText={errors.website?.message}
          label="Website"
          autoFocus
        />
        <MuiTelInput
          value={number}
          sx={{ mt: 1 }}
          defaultCountry="HR"
          label="Phone number"
          {...register('phone')}
          fullWidth
          onChange={newValue => {
            setNumber(newValue);
            setValue('phone', newValue);
          }}
        />
      </Box>
    </Grid>
  );
};
