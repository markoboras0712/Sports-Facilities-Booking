import { Typography } from '@mui/material';
import * as React from 'react';

interface Props {
  mt: number;
}

export const Copyright: React.FC<Props> = ({ mt }) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={{ mt }}
    >
      {'Sport Facilities Booking © '}

      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};
