import * as React from 'react';
import { Paper, Box, Grid, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
  AuthenticationForm,
  AuthenticationLayout,
  userSelectors,
} from 'modules/authentication';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { CustomizedSnackbars } from 'shared/components';

export const SignUp: React.FC = () => {
  const registerError = useRecoilValue(userSelectors.registerError);
  const errorCleanup = useSetRecoilState(userSelectors.registerErrorCleanup);

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
            Sign up
          </Typography>
          <PersonAddIcon />
          <AuthenticationForm
            authenticationTitle="Sign Up"
            forgotPassword
            backToLogin
          />
          <CustomizedSnackbars
            errorCleanup={errorCleanup}
            snackbarMessage={registerError}
            snackbarOpen={Boolean(registerError)}
          />
        </Box>
      </Grid>
    </AuthenticationLayout>
  );
};
