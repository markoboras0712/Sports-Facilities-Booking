import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { navigate } from '@reach/router';
import { authSelectors } from 'modules/authentication';
import { settingsSelector } from 'modules/authorization';
import { Routes } from 'modules/routing';
import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { useDeviceSizes } from 'shared/hooks';
import { DrawerNavigation } from './DrawerNavigation';
import { UserMenu } from './UserMenu';

export const Navigation: React.FC = () => {
  const user = useRecoilValue(authSelectors.user);
  const settings = useRecoilValue(settingsSelector.settings);
  const fullName = settings?.firstName + ' ' + settings?.lastName;

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
            {user?.userUid ? (
              <>
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
                  onClick={() => navigate(Routes.FacilityBuilder)}
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
                  {fullName}
                </Typography>
                <UserMenu />
              </>
            ) : (
              <>
                <Button
                  sx={{
                    borderRadius: 1,
                    textTransform: 'none',
                    py: 1,
                    px: 3.5,
                    display: { xs: 'none', sm: 'block' },
                  }}
                  variant="outlined"
                >
                  Login
                </Button>
              </>
            )}
          </Box>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};
