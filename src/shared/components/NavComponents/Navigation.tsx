import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { useDeviceSizes } from 'shared/hooks';
import { DrawerNavigation } from './DrawerNavigation';
import { UserMenu } from './UserMenu';

export const Navigation: React.FC = () => {
  const { mobile } = useDeviceSizes();

  return (
    <>
      <Grid container>
        <Grid item xs={6} sm={3}>
          <DrawerNavigation />
        </Grid>
        <Grid item xs={6} sm={9}>
          <Box
            sx={{
              pr: mobile ? 4 : 8,
              py: 2.25,
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <Button
              sx={{
                borderRadius: 1,
                textTransform: 'none',
                py: 1,
                px: 3.5,
                mr: 5,
                display: { xs: 'none', sm: 'block' },
              }}
              variant="outlined"
            >
              Host Facility
            </Button>
            <Typography
              sx={{
                mr: 2,
                py: 1,
                display: { xs: 'none', md: 'block' },
              }}
            >
              Peter Parker
            </Typography>
            <UserMenu />
          </Box>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};
