import CallIcon from '@mui/icons-material/Call';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { authSelectors } from 'modules/authentication';
import { settingsSelector } from 'modules/authorization';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { Facility } from '../models';

export const FacilityContact: React.FC = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Facility>();

  const settings = useRecoilValue(settingsSelector.settings);
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
        <TextField
          margin="normal"
          {...register('postalCode')}
          fullWidth
          InputLabelProps={{ shrink: true }}
          id="postalCode"
          defaultValue={settings?.postalCode}
          label="Postal Code"
          autoFocus
        />
      </Box>
    </Grid>
  );
};
