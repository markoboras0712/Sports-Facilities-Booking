import { Box, Grid, Stack } from '@mui/material';
import { suggestedSports } from 'const';
import * as React from 'react';
import { useDeviceSizes } from 'shared/hooks';
import { SuggestedSport } from './SuggestedSport';

export const SuggestedSports: React.FC = () => {
  const { mediumDeviceSize } = useDeviceSizes();

  return (
    <Grid item>
      {!mediumDeviceSize && (
        <Box
          sx={{
            px: { sm: 3.5, md: 7, lg: 24 },
            backgroundColor: !mediumDeviceSize ? '#EFF4F8' : 'white',
            pb: 12,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Stack
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={{ xs: 1, sm: 2, md: 4 }}
          >
            <SuggestedSport sports={suggestedSports} />
          </Stack>
        </Box>
      )}
    </Grid>
  );
};
