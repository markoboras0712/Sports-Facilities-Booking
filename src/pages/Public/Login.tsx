import * as React from 'react';
import { Paper, Box, Grid, Typography } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import {
  AuthenticationLayout,
  useAuthentication,
} from 'modules/authentication';
import { Form, SideRandomImage } from 'shared';

export const Login: React.FC = () => {
  const { loginWithEmailPassword } = useAuthentication();
  const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log('ovo');
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
    loginWithEmailPassword(
      data.get('email') as string,
      data.get('password') as string,
    );
  };

  return (
    <AuthenticationLayout>
      <SideRandomImage />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
          <Form handleSubmit={submitForm} />
        </Box>
      </Grid>
    </AuthenticationLayout>
  );
};
