import { CssBaseline } from '@mui/material';
import React from 'react';
import { Navigation, SearchFacility } from 'shared/components';

export const LandingPage: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Navigation />
      <SearchFacility />
    </>
  );
};
