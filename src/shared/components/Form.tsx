import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Link } from '@reach/router';
import { Routes } from 'modules/routing';
import React, { useState } from 'react';
import { Copyright } from './Copyright';
import { useForm } from 'react-hook-form';
import { AuthenticationButtons } from './AuthenticationButtons';
import { AuthenticationData } from 'modules/authentication';
import { Visibility, VisibilityOff } from '@mui/icons-material';

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
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields, isDirty },
  } = useForm<AuthenticationData>();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  console.log({ errors, dirtyFields, isDirty });
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
        {...register('email', {
          required: 'Email Address is required.',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address.',
          },
        })}
        required
        fullWidth
        error={errors.email !== undefined}
        id={'email'}
        helperText={errors.email?.message}
        label={'Email Address'}
        autoFocus
      />
      <TextField
        margin="normal"
        {...register('password', {
          required: 'Password is required.',
          minLength: {
            message: 'Password must be at least 6 characters.',
            value: 6,
          },
        })}
        helperText={errors.password?.message}
        error={errors.password !== undefined}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        required
        fullWidth
        id={'password'}
        label={'Password'}
        type={showPassword ? 'text' : 'password'}
        autoFocus
      />

      <br />
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
