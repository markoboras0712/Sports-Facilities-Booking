import * as React from 'react';
import { Paper, Box, Grid, Typography } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { AuthenticationLayout } from 'modules/authentication';
import { Form } from 'shared/components';

export const SignUp: React.FC = () => {
  // const { registerWithEmailPassword } = useAuthentication();
  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get('email'),
  //     password: data.get('password'),
  //   });
  //   registerWithEmailPassword(
  //     data.get('email') as string,
  //     data.get('password') as string,
  //   );
  // };

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
          <Form authenticationTitle="Sign Up" forgotPassword backToLogin />
        </Box>
      </Grid>
    </AuthenticationLayout>
  );
};
