import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import { Link } from '@reach/router';
import { Routes } from 'modules/routing';
import React from 'react';
import { Copyright } from './Copyright';
import { LoginInput } from 'shared/models';
import { AuthenticationButtons } from './AuthenticationButtons';

interface Props {
  components: LoginInput[];
}

export const Form: React.FC<Props> = ({ components }) => {
  console.log({ components });

  const loginWithEmailHandler = () => {
    console.log('ddd');
  };
  return (
    <Box
      component="form"
      noValidate
      sx={{
        margin: 2,
      }}
    >
      {components.map(({ label, name }, index) => {
        return (
          <TextField
            margin="normal"
            key={index}
            required
            fullWidth
            id={name}
            label={label}
            name={name}
            autoComplete={name}
            type={name}
            autoFocus
          />
        );
      })}
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <AuthenticationButtons
        authenticationAction={loginWithEmailHandler}
        title="Sign In"
        googleLogin
        facebookLogin
      />
      <Grid container>
        <Grid item xs>
          <Link to={Routes.ForgotPassword}> Forgot password?</Link>
        </Grid>
        <Grid item>
          <Link to={Routes.SignUp}>{"Don't have an account? Sign Up"}</Link>
        </Grid>
      </Grid>
      <Copyright mt={10} />
    </Box>
  );
};
