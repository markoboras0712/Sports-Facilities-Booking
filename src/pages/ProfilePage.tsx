import { Box, LinearProgress } from '@mui/material';
import { authSelectors } from 'modules/authentication';
import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { Navigation } from 'shared/components';

export const ProfilePage: React.FC = () => {
  const user = useRecoilValue(authSelectors.user);

  if (user?.userUid === '') {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }
  return (
    <>
      <Navigation />
    </>
  );
};
