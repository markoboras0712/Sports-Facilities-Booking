import CallIcon from '@mui/icons-material/Call';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { authSelectors } from 'modules/authentication';
import { MuiTelInput } from 'mui-tel-input';
import * as React from 'react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { Facility } from '../models';

export const FacilityContact: React.FC = () => {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext<Facility>();
  const [number, setNumber] = useState('');

  const user = useRecoilValue(authSelectors.user);

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
        Contact
      </Typography>
      <CallIcon />
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
          value={getValues().phone || number}
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
