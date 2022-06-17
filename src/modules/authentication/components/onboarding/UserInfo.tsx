/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, TextField, Typography } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { PhotoCamera } from '@mui/icons-material';
import React from 'react';
import { PersonalData } from 'modules/authentication';
import { useForm } from 'react-hook-form';

interface Props {
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
}

export const UserInfo: React.FC<Props> = ({ firstName, setFirstName }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalData>();

  const onSubmit = handleSubmit((data: PersonalData) => {
    // if (errors.email || errors.password) return;
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
      <Box onSubmit={onSubmit} component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          {...register('firstName', {
            required: 'First name is required.',
          })}
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          error={errors.firstName !== undefined}
          id="firstName"
          helperText={errors.firstName?.message}
          label="First Name"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          autoComplete="lastName"
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
