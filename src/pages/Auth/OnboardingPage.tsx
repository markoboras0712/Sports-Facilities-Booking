import { Box, Grid, LinearProgress, Paper } from '@mui/material';
import { useAuthenticationRedirects } from 'modules/authentication';
import { OnboardingBuilder } from 'modules/authorization';
import * as React from 'react';

export const OnboardingPage: React.FC = () => {
  const { loading } = useAuthenticationRedirects();

  if (loading) {
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
