import { Box, Grid } from '@mui/material';
import * as React from 'react';
import { PopularCards } from '../PopularComponents';
import { SuggestedSports } from '../SuggestedSportsComponents/SuggestedSports';
import { LandingHero } from './LandingHero';
import { SearchTools } from './SearchTools';

export const SearchFacility: React.FC = () => {
  return (
    <Grid container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <LandingHero />
        <SearchTools />
        <SuggestedSports />
        <PopularCards />
      </Box>
    </Grid>
  );
};
