import LockOpenIcon from '@mui/icons-material/LockOpen';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  LinearProgress,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Link } from '@reach/router';
import {
  AuthenticationLayout,
  useAuthentication,
  useAuthenticationRedirects,
} from 'modules/authentication';
import { Routes } from 'modules/routing';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Copyright } from 'shared/components';

export const ForgotPasswordPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();
  const { loading } = useAuthenticationRedirects();
  const { resetPassword } = useAuthentication();

  const onSubmit = handleSubmit(({ email }) => {
    resetPassword(email);
  });

  if (loading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

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
            Forgot Password
          </Typography>
          <LockOpenIcon />
          <Box sx={{ mt: 1 }}>
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              onClick={onSubmit}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset password
            </Button>
            <Grid container>
              <Grid item>
                <Link to={Routes.Login}> Back to login</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright mt={8} />
      </Grid>
    </AuthenticationLayout>
  );
};
