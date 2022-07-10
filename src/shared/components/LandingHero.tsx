import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

export const LandingHero: React.FC = () => {
  return (
    <Grid
      item
      sx={{
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifycontent: 'center',
      }}
    >
      <Box
        sx={{
          pt: 15,
          pb: 1,
        }}
      >
        <Typography variant="h2">THE BALL IS IN YOUR COURT</Typography>
      </Box>
      <Box
        sx={{
          pb: 1,
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4">Book a sports facility near you!</Typography>
      </Box>
    </Grid>
  );
};
