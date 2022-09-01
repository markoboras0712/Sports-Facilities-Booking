import {
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import { myFacilities, useFacilitiesRedirects } from 'modules/facilities';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { ImageCardsCarousel, Navigation } from 'shared/components';

export const MyReservedFacilitiesPage: React.FC = () => {
  const { loading: userLoading } = useFacilitiesRedirects();
  const facilities = useRecoilValue(myFacilities);

  if (!facilities || userLoading) {
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
            MY RESERVED FACILITIES
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
                  key={index}
                  sx={{
                    mb: 2,
                  }}
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
                        Capacity: {facility.capacity}
                      </Typography>

                      <Typography
                        variant="h6"
                        color="text.secondary"
                        gutterBottom
                      >
                        Sport type: {facility.sportType}
                      </Typography>
                      {facility.reservedTimes &&
                        facility.reservedTimes.map(reservation => (
                          <Typography
                            key={reservation.reservationId}
                            variant="h6"
                            color="text.secondary"
                            gutterBottom
                          >
                            Reservation time:{' '}
                            {reservation.startTime?.getHours()}
                            {reservation.startTime?.getMinutes() === 0
                              ? ''
                              : `:${reservation.startTime?.getMinutes()}`}{' '}
                            - {reservation.endTime?.getHours()}
                            {reservation.endTime?.getMinutes() === 0
                              ? ''
                              : `:${reservation.endTime?.getMinutes()}`}
                            {'  '}
                          </Typography>
                        ))}
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="h6" sx={{ color: '#121212', mt: 4, pl: 2 }}>
                You haven't any reservation for your sport facilities yet.
              </Typography>
            )}
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
