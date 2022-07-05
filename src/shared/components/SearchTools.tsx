import { Box, Typography } from '@mui/material';
import React from 'react';

export const SearchTools: React.FC = () => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          pl: 36,
          pr: 36,
          pb: 2.5,
          display: 'flex',
          justifyContent: 'flex-start',
        }}
      >
        <Typography
          sx={{
            pl: 3,
            pt: 1.5,
            pb: 1.5,
            pr: 1.5,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Icon
        </Typography>
        <Typography
          sx={{
            pt: 1.5,
            pb: 1.5,
            pr: 8,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Find my location
        </Typography>
        <Typography
          sx={{
            pt: 1.5,
            pb: 1.5,
            pr: 1.5,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Icon
        </Typography>
        <Typography
          sx={{
            pt: 1.5,
            pb: 1.5,
            pr: 17.625,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Sport or venue name
        </Typography>
        <Typography
          sx={{
            pt: 1.5,
            pb: 1.5,
            pr: 1.5,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Icon
        </Typography>
        <Typography
          sx={{
            pt: 1.5,
            pb: 1.5,
            pr: 14,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Choose a date
        </Typography>
        <Typography
          sx={{
            pt: 1.5,
            pb: 1.5,
            pr: 5,
            pl: 5,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          Search
        </Typography>
      </Box>
    </>
  );
};
