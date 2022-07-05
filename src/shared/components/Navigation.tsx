import { Box, Typography } from '@mui/material';
import React from 'react';

export const Navigation: React.FC = () => (
  <>
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Box
        sx={{
          width: '100%',
          pl: 8,
          pt: 2,
          pb: 2,
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <Typography
          sx={{
            mr: 4,
          }}
        >
          Logo
        </Typography>
        <Typography>My bookings</Typography>
      </Box>
      <Box
        sx={{
          width: '100%',
          pr: 8,
          pt: 2.25,
          pb: 2.25,
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <Typography
          sx={{
            mr: 5,
          }}
        >
          Host facility
        </Typography>
        <Typography>Profile</Typography>
      </Box>
    </Box>
  </>
);
