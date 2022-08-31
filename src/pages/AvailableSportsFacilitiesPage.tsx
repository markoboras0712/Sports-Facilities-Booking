import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import { navigate } from '@reach/router';
import {
  availableFacilities,
  useFacilitiesRedirects,
} from 'modules/facilities';
import { Routes } from 'modules/routing';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { ImageCardsCarousel, Navigation } from 'shared/components';

export const AvailableSportsFacilitiesPage: React.FC = () => {
  const facilities = useRecoilValue(availableFacilities);
  const { loading } = useFacilitiesRedirects();

  if (loading || !facilities) {
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
            AVAILABLE SPORT FACILITIES FOR RESERVATION
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 3, sm: 6, md: 12 }}
          >
            {facilities.length ? (
              facilities.map((facility, index) => (
                <Grid
                  item
                  key={facility.id || index}
                  sx={{
                    mb: 2,
                  }}
                  xs={8}
                  sm={8}
                  md={6}
                >
                  <Card
                    sx={{
                      width: '100%',
                      borderRadius: 2,
                    }}
                  >
                    <ImageCardsCarousel imageUrls={facility.imageUrls} />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Facility name: {facility.facilityName}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        Address: {facility.address}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        Sport: {facility.sportType.toUpperCase()}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        gutterBottom
                      >
                        ${facility.price} per hour
                      </Typography>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        gutterBottom
                      >
                        Start working hour:{' '}
                        {facility.startWorkingHour?.toLocaleTimeString()}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        gutterBottom
                      >
                        End working hour:{' '}
                        {facility.endWorkingHour?.toLocaleTimeString()}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ display: 'flex' }} disableSpacing>
                      <Button
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          mx: 2,
                        }}
                        fullWidth
                        variant="outlined"
                        onClick={() =>
                          navigate(Routes.MakeReservation, {
                            state: {
                              facilityId: facility.id,
                              creatorId: facility.creatorId,
                            },
                          })
                        }
                      >
                        Make a reservation
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="h6" sx={{ color: '#121212', mt: 4, pl: 2 }}>
                There isn't any available sport facility to reservate yet.
                Please check another time.
              </Typography>
            )}
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
