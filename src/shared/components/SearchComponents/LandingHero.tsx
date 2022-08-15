import { Box, Grid, Paper, Typography } from '@mui/material';
import * as React from 'react';
import { useDeviceSizes } from 'shared/hooks';

const styles = {
  paperContainer: {
    backgroundImage: `url(https://img.freepik.com/free-vector/gradient-football-field-background_52683-65681.jpg?w=2000)`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '30vh',
  },
};

export const LandingHero: React.FC = () => {
  const { smallDeviceSize } = useDeviceSizes();

  return (
    <>
      {!smallDeviceSize && (
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
              pt: 15,
              pb: 1,
            }}
          >
            <Typography variant="h2">THE BALL IS IN YOUR COURT</Typography>
          </Box>
          <Box
            sx={{
              pb: 1,
              justifyContent: 'center',
            }}
          >
            <Typography variant="h4">
              Book a sports facility near you!
            </Typography>
          </Box>
        </Grid>
      )}
      {smallDeviceSize && <Paper style={styles.paperContainer} />}
    </>
  );
};
