import { Box, Button, LinearProgress } from '@mui/material';
import { useAuthentication } from 'modules/authentication';
import { useDashboardRedirects } from 'modules/dashboard';
import * as React from 'react';

export const AvailableFacilitiesPage: React.FC = () => {
  const { logout } = useAuthentication();
  const { loading } = useDashboardRedirects();

  if (loading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <>
      Available Facilities
      <Button
        onClick={logout}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Logout
      </Button>
    </>
  );
};
