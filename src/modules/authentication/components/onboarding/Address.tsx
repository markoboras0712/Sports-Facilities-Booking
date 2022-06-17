import { Box, TextField, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';

export const Address: React.FC = () => {
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
        Address
      </Typography>
      <HomeIcon />
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="address"
          label="Address"
          name="address"
          autoComplete="address"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="country"
          label="Country"
          name="country"
          autoComplete="country"
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="city"
          label="City"
          name="city"
          autoComplete="city"
          autoFocus
        />
        <TextField
          margin="normal"
          fullWidth
          id="postalCode"
          label="Postal Code"
          name="Postal Code"
          autoComplete="postalCode"
          autoFocus
        />
      </Box>
    </Box>
  );
};
