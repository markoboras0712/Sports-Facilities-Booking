import {
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import { popularCards } from 'const';
import { authSelectors } from 'modules/authentication';
import { myFacilities } from 'modules/facilities';
import { useFirestore } from 'modules/firebase';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { ImageCardsCarousel, Navigation } from 'shared/components';

export const MySportsFacilitiesPage = () => {
  const { getFacilities } = useFirestore();
  const user = useRecoilValue(authSelectors.user);
  const facilities = useRecoilValue(myFacilities);

  useEffect(() => {
    if (!user?.userUid) return;

    getFacilities(user.userUid);
  }, [user]);

  if (!facilities) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <>
      <Navigation />
      <Grid sx={{ px: 8, py: 4 }} container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: '#939393', textTransform: 'uppercase', mb: 4 }}
          >
            MY SPORT FACILITIES
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 3, sm: 6, md: 12 }}
          >
            {popularCards.map(
              ({ name, address, facilityType, price }, index) => (
                <Grid
                  sx={{ mb: 2, width: '100%' }}
                  item
                  key={index}
                  xs={3}
                  sm={3}
                  md={3}
                >
                  <Card
                    sx={{
                      height: '100%',
                      width: '100%',
                      borderRadius: 2,
                    }}
                  >
                    <ImageCardsCarousel />
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        {name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {address}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {facilityType}
                      </Typography>
                      <Typography gutterBottom>{price} HRK / hour</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ),
            )}
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
