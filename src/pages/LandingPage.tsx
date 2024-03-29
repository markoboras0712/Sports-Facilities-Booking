import { Box, CssBaseline, LinearProgress } from '@mui/material';
import { authSelectors } from 'modules/authentication';
import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { Navigation, SearchFacility } from 'shared/components';

export const LandingPage: React.FC = () => {
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
      <CssBaseline />
      <Navigation />
      <SearchFacility />
    </>
  );
};
