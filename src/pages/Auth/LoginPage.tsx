import LoginIcon from '@mui/icons-material/Login';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import {
  AuthenticationForm,
  AuthenticationLayout,
  SideRandomImage,
  useAuthenticationRedirects,
  userSelectors,
} from 'modules/authentication';
import * as React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CustomizedSnackbars } from 'shared/components';

export const LoginPage: React.FC = () => {
  const { loading } = useAuthenticationRedirects();
  const loginError = useRecoilValue(userSelectors.loginError);
  const errorCleanup = useSetRecoilState(userSelectors.loginErrorCleanup);

  if (loading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <AuthenticationLayout>
      <SideRandomImage />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        item
        xs={12}
        sm={10}
        md={6}
        component={Paper}
      >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <LoginIcon />
          <AuthenticationForm
            authenticationTitle="Sign In"
            forgotPassword
            backToSignup
          />
          <CustomizedSnackbars
            errorCleanup={errorCleanup}
            snackbarMessage={loginError}
            snackbarOpen={Boolean(loginError)}
          />
        </Box>
      </Grid>
    </AuthenticationLayout>
  );
};
