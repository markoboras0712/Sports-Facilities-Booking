import { Box, Button, Divider, Grid, Paper } from '@mui/material';
import { navigate } from '@reach/router';
import { searchFacilityInput } from 'modules/facilities';
import { Routes } from 'modules/routing';
import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { useDeviceSizes } from 'shared/hooks';
import { CustomDatePicker } from './CustomDatePicker';
import { SearchSport } from './SearchSport';

export const SearchTools: React.FC = () => {
  const { mediumDeviceSize } = useDeviceSizes();
  const searchFacilityInputValue = useRecoilValue(searchFacilityInput);

  return (
    <Grid item>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: !mediumDeviceSize ? '#EFF4F8' : 'white',
          height: 85,
          pb: 2.5,
          pt: 1,
          px: { sm: 3.5, md: 7, lg: 24 },
        }}
      >
        <Paper
          component="form"
          variant="outlined"
          sx={{
            display: 'flex',
            borderColor: mediumDeviceSize ? 'gray' : 'white',
            borderRadius: 2,
            border: 0,
            boxShadow: !mediumDeviceSize
              ? '0px 4px 24px rgba(21, 44, 66, 0.1)'
              : 'none',
            flexDirection: { xs: 'column', md: 'row' },
            width: mediumDeviceSize ? '100%' : 'auto',
            py: !mediumDeviceSize ? 1.5 : 0,
            px: !mediumDeviceSize ? 0 : 2,
          }}
        >
          <SearchSport />
          <Divider
            sx={{ display: { xs: 'none', md: 'block' }, p: 0 }}
            orientation="vertical"
          />
          <CustomDatePicker />
          <Box sx={{ display: 'flex', pl: 3, pr: 1.5 }}>
            {mediumDeviceSize && (
              <Button
                sx={{ px: 5, py: 1.5, textTransform: 'none', borderRadius: 1 }}
                size="medium"
                fullWidth
                variant="contained"
                onClick={() =>
                  navigate(Routes.QuickSearch, {
                    state: {
                      searchFacilityInputValue,
                    },
                  })
                }
              >
                Search
              </Button>
            )}
          </Box>
        </Paper>
        {!mediumDeviceSize && (
          <Button
            sx={{ px: 5, py: 1.5, textTransform: 'none', borderRadius: 1 }}
            size="medium"
            onClick={() =>
              navigate(Routes.QuickSearch, {
                state: {
                  searchFacilityInputValue,
                },
              })
            }
            variant="contained"
          >
            Search
          </Button>
        )}
      </Box>
    </Grid>
  );
};
