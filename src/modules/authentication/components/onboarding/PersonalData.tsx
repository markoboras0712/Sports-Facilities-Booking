import { Box, Button, TextField, Typography } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { PhotoCamera } from '@mui/icons-material';
import React from 'react';

export const PersonalData: React.FC = ({}) => {
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
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="firstName"
          label="First Name"
          name="firstName"
          autoComplete="firstName"
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
