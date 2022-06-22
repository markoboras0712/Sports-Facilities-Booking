import { Button } from '@mui/material';
import { useAuthentication } from 'modules/authentication';
import { settingsSelector } from 'modules/authorization';
import React from 'react';
import { useRecoilValue } from 'recoil';

export const AvailableFacilities: React.FC = () => {
  const { logout } = useAuthentication();
  const settings = useRecoilValue(settingsSelector.settings);
  console.log({ settings });
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
