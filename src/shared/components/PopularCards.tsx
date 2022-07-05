import { Box, Typography } from '@mui/material';
import React from 'react';

interface Facility {
  image: string;
  name: string;
  address: string;
  indoor: boolean;
  price: number;
}

interface Props {
  facilities: Facility[];
}

export const PopularCards: React.FC<Props> = ({ facilities }) => {
  return (
    <Box
      sx={{
        width: '100%',
        pl: 8,
        pr: 8,
        pb: 14,
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
      }}
    >
      {facilities.map((facility, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            mr: 4,
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Typography>{facility.image}</Typography>
          <Typography>{facility.name}</Typography>
          <Typography>{facility.address}</Typography>
          <Typography>{facility.indoor}</Typography>
          <Typography>{facility.price}</Typography>
        </Box>
      ))}
    </Box>
  );
};
