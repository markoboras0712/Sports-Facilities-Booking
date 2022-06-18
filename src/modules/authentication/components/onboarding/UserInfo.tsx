/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Grid, TextField } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { BigHead } from '@bigheads/core';
import { AvatarData, OnboardingData } from 'modules/authentication/models';

interface Props {
  avatarPhoto?: AvatarData;
}

export const UserInfo: React.FC<Props> = ({ avatarPhoto }) => {
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
      <Box height={200} width={250} sx={{ mb: 10 }}>
        <BigHead {...(avatarPhoto as any)} />
      </Box>

      <Box sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          {...register('firstName', {
            required: 'First name is required.',
          })}
          required
          fullWidth
          error={errors.firstName !== undefined}
          id="firstName"
          helperText={errors.firstName?.message}
          label="First Name"
          autoFocus
        />
        <TextField
          margin="normal"
          {...register('lastName', {
            required: 'Last name is required.',
          })}
          required
          fullWidth
          error={errors.lastName !== undefined}
          id="lastName"
          helperText={errors.lastName?.message}
          label="Last Name"
          name="lastName"
          autoFocus
        />
      </Box>
    </Grid>
  );
};
