import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import {
  AuthenticationForm,
  AuthenticationLayout,
  useAuthenticationRedirects,
} from 'modules/authentication';
import * as React from 'react';

export const RegisterPage: React.FC = () => {
  const { loading } = useAuthenticationRedirects();

  if (loading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <AuthenticationLayout>
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
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Create account
          </Typography>
          <PersonAddIcon />
          <AuthenticationForm
            authenticationTitle="Create account"
            forgotPassword
            backToLogin
          />
        </Box>
      </Grid>
    </AuthenticationLayout>
  );
};
