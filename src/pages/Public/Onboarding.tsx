import * as React from 'react';
import { Box, Grid, LinearProgress, Paper } from '@mui/material';
import {
  OnboardingBuilder,
  useOnboardingRedirects,
} from 'modules/authorization';

export const Onboarding: React.FC = () => {
  const loaded = useOnboardingRedirects();
  console.log('loaded', loaded);

  if (!loaded) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        item
        xs={12}
        sm={10}
        md={12}
        component={Paper}
      >
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <OnboardingBuilder />
        </Box>
      </Grid>
    </Grid>
  );
};
