import { Box, Grid } from '@mui/material';
import React from 'react';
import { SuggestedSports } from '../SuggestedSportsComponents/SuggestedSports';
import { LandingHero } from './LandingHero';
// import { PopularCards } from './PopularCards';
import { SearchTools } from './SearchTools';
// import { SuggestedSports } from './SuggestedSports';

export const SearchFacility: React.FC = () => {
  // const popular = [
  //   {
  //     image: 'Slika1',
  //     name: 'Sokol Centar',
  //     address: 'Adress',
  //     indoor: true,
  //     price: 300,
  //   },
  //   {
  //     image: 'Slika2',
  //     name: 'Sokol Centar',
  //     address: 'Adress',
  //     indoor: true,
  //     price: 300,
  //   },
  //   {
  //     image: 'Slika1',
  //     name: 'Sokol Centar',
  //     address: 'Adress',
  //     indoor: true,
  //     price: 300,
  //   },
  //   {
  //     image: 'Slika2',
  //     name: 'Sokol Centar',
  //     address: 'Adress',
  //     indoor: true,
  //     price: 300,
  //   },
  // ];
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
