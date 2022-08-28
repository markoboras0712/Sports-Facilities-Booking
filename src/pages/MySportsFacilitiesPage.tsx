import {
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
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
            width: '100%',
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
            {facilities ? (
              facilities.map(
                (
                  { facilityName, address, sportType, price, imageUrls },
                  index,
                ) => (
                  <Grid
                    sx={{
                      mb: 2,
                    }}
                    item
                    key={index}
                    xs={8}
                    sm={8}
                    md={6}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 2,
                      }}
                    >
                      <ImageCardsCarousel imageUrls={imageUrls} />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {facilityName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {address}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {sportType}
                        </Typography>
                        <Typography gutterBottom>{price} $ per hour</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ),
              )
            ) : (
              <Typography
                variant="h3"
                sx={{ color: '#939393', textTransform: 'uppercase', mb: 4 }}
              >
                You haven't created any sport facility yet. Please host facility
                first.
              </Typography>
            )}
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
