import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
} from '@mui/material';
import { Link } from '@reach/router';
import { Routes } from 'modules/routing';
import React from 'react';
import { Copyright } from './Copyright';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { useAuthentication } from 'modules/authentication';

interface Props {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export const Form: React.FC<Props> = ({ handleSubmit }) => {
  const { loginWithGoogle, loginWithFacebook } = useAuthentication();
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Sign In
      </Button>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        onClick={() => loginWithGoogle()}
        sx={{ mt: 3, mb: 2 }}
      >
        <GoogleIcon />
      </Button>
      <Button
        type="submit"
        fullWidth
        onClick={() => loginWithFacebook()}
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        <FacebookIcon />
      </Button>
      <Grid container>
        <Grid item xs>
          <Link to={Routes.ForgotPassword}> Forgot password?</Link>
        </Grid>
        <Grid item>
          <Link to={Routes.SignUp}>{"Don't have an account? Sign Up"}</Link>
        </Grid>
      </Grid>
      <Copyright mt={5} />
    </Box>
  );
};
