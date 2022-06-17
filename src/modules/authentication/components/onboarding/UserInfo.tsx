/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, TextField, Typography } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { PhotoCamera } from '@mui/icons-material';
import React from 'react';
import { PersonalData } from 'modules/authentication';
import { useFormContext } from 'react-hook-form';

export const UserInfo: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext<PersonalData>();

  const onSubmit = handleSubmit((data: PersonalData) => {
    if (errors.firstName || errors.lastName) return;
    // const { email, password } = data;
    // pathname === Routes.Login
    //   ? loginWithEmailPassword(email, password)
    //   : registerWithEmailPassword(email, password);
    console.log('Succes', data);
  });

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Personal data
      </Typography>
      <HowToRegIcon />
      <Box onClick={onSubmit} sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          {...register('firstName', {
            required: 'First name is required.',
          })}
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
          fullWidth
          error={errors.lastName !== undefined}
          id="lastName"
          helperText={errors.lastName?.message}
          label="Last Name"
          name="lastName"
          autoFocus
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          <PhotoCamera />
          {'Image'}
        </Button>
      </Box>
    </Box>
  );
};
