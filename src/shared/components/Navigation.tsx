import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useDeviceSizes } from 'shared/hooks';

export const Navigation: React.FC = () => {
  const { laptop, mobile, tablet } = useDeviceSizes();
  console.log({ mobile, tablet, laptop });

  return (
    <Grid container>
      <Grid item xs={12} sm={6}>
        <Box
          sx={{
            pl: 8,
            pt: 2,
            pb: 2,
            display: 'flex',
            justifyContent: !mobile ? 'flex-start' : 'space-around',
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
      </Grid>
      <Grid item xs={12} sm={6}>
        <Box
          sx={{
            pr: 8,
            pt: 2.25,
            pb: 2.25,
            display: 'flex',
            justifyContent: !mobile ? 'flex-end' : 'space-around',
          }}
        >
          <Typography
            sx={{
              mr: 5,
            }}
          >
            Host facility
          </Typography>
          <Typography>Name</Typography>
          <Typography>Photo </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
