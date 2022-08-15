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
        {/* <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Box
            sx={{
              display: 'flex',
            }}
          >
            <Box
              sx={{
                width: '100%',
                pl: 8,
                pb: 3.5,
                mr: 130.375,
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            >
              <Typography>POPULAR NEAR YOU</Typography>
            </Box>
            <Box
              sx={{
                width: '100%',
                pr: 8,
                pb: 3.5,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Typography
                sx={{
                  mr: 2.25,
                }}
              >
                See all
              </Typography>
              <Typography>Icon</Typography>
            </Box>
          </Box>
          {/* <PopularCards facilities={popular} /> }
          <Box>
            <Typography
              sx={{
                pl: 8,
                pb: 3.5,
              }}
            >
              MAP VIEW
            </Typography>
            <Typography
              sx={{
                pl: 8,
                pr: 8,
                pb: 27,
              }}
            >
              Google maps
            </Typography>
          </Box>
        </Box> */}
      </Box>
    </Grid>
  );
};
