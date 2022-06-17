import { Grid } from '@mui/material';
import React from 'react';

export const SideRandomImage: React.FC = () => {
  return (
    <>
      <Grid
        item
        xs={false}
        sm={2}
        md={6}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
    </>
  );
};
