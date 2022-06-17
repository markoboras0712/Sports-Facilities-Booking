import * as React from 'react';
import {
  Paper,
  Box,
  Grid,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link } from '@reach/router';
import { Routes } from 'modules/routing';
import { AuthenticationLayout } from 'modules/authentication';
import { Copyright } from 'shared/components';

export const ForgotPassword: React.FC = () => {
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
          <Box component="form" noValidate sx={{ mt: 1 }}>
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
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
