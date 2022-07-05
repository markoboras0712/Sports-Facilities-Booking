import { Box, Typography } from '@mui/material';
import React from 'react';

interface Props {
  sports: string[];
}

export const SuggestedSports: React.FC<Props> = ({ sports }) => {
  return (
    <Box
      sx={{
        width: '100%',
        pl: 36,
        pr: 36,
        pb: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
      }}
    >
      {' '}
      {sports.map((sport, index) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}
          key={index}
        >
          <Typography
            sx={{
              pl: 2,
              pt: 1.25,
              pb: 1.25,
              pr: 0.5,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            Icon
          </Typography>
          <Typography
            sx={{
              pt: 1,
              pb: 1,
              pr: 2,
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            {sport}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
