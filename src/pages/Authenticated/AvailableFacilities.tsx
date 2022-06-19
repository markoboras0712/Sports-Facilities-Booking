import { Button } from '@mui/material';
import { useAuthentication } from 'modules/authentication';
import React from 'react';

export const AvailableFacilities: React.FC = () => {
  const { logout } = useAuthentication();
  return (
    <>
      Available Facilities
      <Button
        onClick={() => logout()}
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
