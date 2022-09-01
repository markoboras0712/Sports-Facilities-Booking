import { Box, Grid, Typography } from '@mui/material';
import * as React from 'react';
import { useDeviceSizes } from 'shared/hooks';

export const LandingHero: React.FC = () => {
  const { smallDeviceSize } = useDeviceSizes();
  return (
    <>
      <Grid
        item
        sx={{
          display: 'flex',
          width: '100%',
          backgroundColor: '#EFF4F8',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            pt: !smallDeviceSize ? 15 : 10,
            pb: 1,
          }}
        >
          {!smallDeviceSize ? (
            <Typography variant="h2">THE BALL IS IN YOUR COURT</Typography>
          ) : (
            <Typography variant="h4">THE BALL IS IN YOUR COURT</Typography>
          )}
        </Box>
        <Box
          sx={{
            pb: !smallDeviceSize ? 1 : 10,
            justifyContent: 'center',
          }}
        >
          <Typography variant="h4">Book a sports facility near you!</Typography>
        </Box>
      </Grid>
    </>
  );
};
