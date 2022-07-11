import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  OutlinedInput,
  Paper,
} from '@mui/material';
import React from 'react';
import { useDeviceSizes } from 'shared/hooks';

export const SearchTools: React.FC = () => {
  const { mediumDeviceSize } = useDeviceSizes();

  return (
    <Grid item>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 2.5,
          pt: 1,
          px: { sm: 1, md: 7, lg: 24 },
        }}
      >
        <Paper
          component="form"
          variant="outlined"
          sx={{
            display: 'flex',
            borderColor: mediumDeviceSize ? 'gray' : 'white',
            borderRadius: 1,
            boxShadow: '0px 4px 24px rgba(21, 44, 66, 0.1)',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: { xs: 'none', sm: 'space-between' },
            width: '100%',
            py: !mediumDeviceSize ? 1.5 : 0,
          }}
        >
          <Box sx={{ display: 'flex' }}>
            {!mediumDeviceSize && (
              <>
                <IconButton
                  sx={{ pl: 3, pr: 1.5 }}
                  disabled
                  aria-label="search"
                >
                  <MyLocationIcon />
                </IconButton>
                <InputBase placeholder="Find my location" />
              </>
            )}
            {mediumDeviceSize && (
              <OutlinedInput fullWidth placeholder="Find my location" />
            )}
          </Box>
          <Divider
            sx={{ display: { xs: 'none', md: 'block' } }}
            orientation="vertical"
          />
          <Box sx={{ display: 'flex' }}>
            {!mediumDeviceSize && (
              <>
                <IconButton
                  sx={{ pl: 3, pr: 1.5 }}
                  disabled
                  aria-label="search"
                >
                  <SearchIcon />
                </IconButton>
                <InputBase placeholder="Sport or venue name" />{' '}
              </>
            )}
            {mediumDeviceSize && (
              <OutlinedInput fullWidth placeholder="Sport or venue name" />
            )}
          </Box>
          <Divider
            sx={{ display: { xs: 'none', md: 'block' } }}
            orientation="vertical"
          />
          <Box sx={{ display: 'flex' }}>
            {!mediumDeviceSize && (
              <>
                <IconButton
                  sx={{ pl: 3, pr: 1.5 }}
                  disabled
                  aria-label="search"
                >
                  <CalendarTodayIcon />
                  {/* <AdapterMoment /> */}
                </IconButton>
                <InputBase placeholder="Choose a date" />
              </>
            )}
            {mediumDeviceSize && (
              <OutlinedInput fullWidth placeholder="Choose a date" />
            )}
          </Box>
          <Divider
            sx={{ display: { xs: 'none', md: 'block' } }}
            orientation="vertical"
          />
          <Box sx={{ display: 'flex' }}>
            {!mediumDeviceSize && <InputBase placeholder="Search" />}
            {mediumDeviceSize && (
              <OutlinedInput fullWidth placeholder="Search" />
            )}
          </Box>
        </Paper>
      </Box>
    </Grid>
  );
};
