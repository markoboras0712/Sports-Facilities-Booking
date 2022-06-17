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
import { useForm } from 'react-hook-form';
import { AuthenticationButtons } from './AuthenticationButtons';
import { AuthenticationData } from 'modules/authentication';

interface Props {
  authenticationTitle: string;
  forgotPassword?: boolean;
  backToLogin?: boolean;
  backToSignup?: boolean;
}

export const Form: React.FC<Props> = ({
  authenticationTitle,
  forgotPassword,
  backToLogin,
  backToSignup,
}) => {
  const { register, handleSubmit } = useForm<AuthenticationData>();
  const onSubmit = handleSubmit((data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };
    console.log(loginData);
  });
  return (
    <Box
      component="form"
      noValidate
      sx={{
        margin: 2,
      }}
    >
      <TextField
        margin="normal"
        {...register('email', { required: true })}
        required
        fullWidth
        id={'email'}
        label={'Email Address'}
        name={'email'}
        autoComplete={'email'}
        type={'email'}
        autoFocus
      />
      <TextField
        margin="normal"
        {...register('password', { required: true })}
        required
        fullWidth
        id={'password'}
        label={'Password'}
        name={'password'}
        autoComplete={'password'}
        type={'password'}
        autoFocus
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <AuthenticationButtons
        authenticationHandler={onSubmit}
        title={authenticationTitle}
        googleLogin
        facebookLogin
      />
      <Grid container>
        <Grid item xs>
          <Link to={Routes.ForgotPassword}>
            {forgotPassword ? 'Forgot password?' : 'Back to login'}{' '}
          </Link>
        </Grid>
        {backToSignup && (
          <Grid item>
            <Link to={Routes.SignUp}>{"Don't have an account? Sign Up"}</Link>
          </Grid>
        )}
        {backToLogin && (
          <Grid item>
            <Link to={Routes.Login}>{'Already have an account? Sign In'}</Link>
          </Grid>
        )}
      </Grid>
      <Copyright mt={10} />
    </Box>
  );
};
