import * as React from 'react';
import { Paper, Box, Grid, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import {
  AuthenticationForm,
  AuthenticationLayout,
} from 'modules/authentication';

export const SignUp: React.FC = () => {
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
        </Box>
      </Grid>
    </AuthenticationLayout>
  );
};
