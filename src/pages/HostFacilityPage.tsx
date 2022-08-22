import { Box, Grid, Paper } from '@mui/material';
import { FacilityBuilder } from 'modules/facilities';
import * as React from 'react';

export const HostFacilityPage: React.FC = () => {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        item
        xs={12}
        sm={10}
        md={12}
        component={Paper}
      >
        <Box
          sx={{
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <FacilityBuilder />
        </Box>
      </Grid>
    </Grid>
  );
};
