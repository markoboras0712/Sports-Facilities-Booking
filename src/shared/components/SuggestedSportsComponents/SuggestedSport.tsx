import { Box, IconButton, Typography } from '@mui/material';
import { Sport } from 'const';
import React from 'react';
import { useDeviceSizes } from 'shared/hooks';

interface Props {
  sports: Sport[];
}

export const SuggestedSport: React.FC<Props> = ({ sports }) => {
  const { mediumDeviceSize } = useDeviceSizes();

  return (
    <>
      {sports.map(({ name, SportIcon }, index) => (
        <Box
          key={index}
          sx={{
            borderColor: mediumDeviceSize ? 'gray' : 'white',
            borderRadius: 2,
            display: 'flex',
            backgroundColor: 'white',
            border: 0,
            height: 44,
            boxShadow: !mediumDeviceSize
              ? '0px 4px 24px rgba(21, 44, 66, 0.1)'
              : 'none',
            py: 1.25,
            pr: 2,
            pl: 1,
          }}
        >
          <IconButton sx={{ mr: 0.5 }} disabled>
            <SportIcon />
          </IconButton>
          <Typography>{name}</Typography>
        </Box>
      ))}
    </>
  );
};