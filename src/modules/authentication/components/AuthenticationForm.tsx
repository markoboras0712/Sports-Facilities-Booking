import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Link, useLocation } from '@reach/router';
import { Routes } from 'modules/routing';
import { useState } from 'react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import {
  Authentication,
  AuthenticationButtons,
  useAuthentication,
} from 'modules/authentication';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Copyright } from 'shared/components';

interface Props {
  authenticationTitle: string;
  forgotPassword?: boolean;
  backToLogin?: boolean;
  backToRegister?: boolean;
}

export const AuthenticationForm: React.FC<Props> = ({
  authenticationTitle,
  forgotPassword,
  backToLogin,
  backToRegister,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const { login, register } = useAuthentication();
  const { pathname } = useLocation();

  const {
    register: registerInput,
    handleSubmit,
    formState: { errors },
  } = useForm<Authentication>();

  const onSubmit = handleSubmit((data: Authentication) => {
    const { email, password } = data;
    pathname === Routes.Login
      ? login(email, password)
      : register(email, password);
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
        {...registerInput('email', {
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
        {...registerInput('password', {
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
        onSubmit={onSubmit}
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
        {backToRegister && (
          <Grid item>
            <Link to={Routes.Register}>{'Create account'}</Link>
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
