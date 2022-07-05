import { Box, Typography } from '@mui/material';
import React from 'react';

export const LandingHero: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          pl: 31.625,
          pr: 31.625,
          pt: 15,
          pb: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography>THE BALL IS IN YOUR COURT</Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          pl: 70.625,
          pr: 70.625,
          pb: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography>Book a sports facility near you!</Typography>
      </Box>
    </>
  );
};
