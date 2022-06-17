import { Typography } from '@mui/material';
import React from 'react';

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
      {'Copyright © '}

      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
};
