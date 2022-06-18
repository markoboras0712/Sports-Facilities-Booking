import * as React from 'react';
import { AvatarData, OnboardingData } from 'modules/authentication';
import { BigHead } from '@bigheads/core';
import { Box, Grid, TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

interface Props {
  avatarPhoto?: AvatarData;
}

export const OnboardingPreview: React.FC<Props> = ({ avatarPhoto }) => {
  const { getValues } = useFormContext<OnboardingData>();

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box height={100} width={150} sx={{ mb: 10 }}>
        <BigHead {...(avatarPhoto as any)} />
      </Box>

      <Box sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          disabled
          fullWidth
          id="firstName"
          label="First Name"
          defaultValue={getValues().firstName}
          autoFocus
        />
        <TextField
          margin="normal"
          disabled
          fullWidth
          id="lastName"
          label="Last Name"
          defaultValue={getValues().lastName}
          autoFocus
        />
        <TextField
          margin="normal"
          disabled
          fullWidth
          id="address"
          label="Address"
          defaultValue={getValues().address}
          autoFocus
        />
        <TextField
          margin="normal"
          disabled
          fullWidth
          id="country"
          label="Country"
          defaultValue={getValues().country}
          autoFocus
        />
        <TextField
          margin="normal"
          disabled
          fullWidth
          id="city"
          label="City"
          defaultValue={getValues().city}
          autoFocus
        />
      </Box>
    </Grid>
  );
};
