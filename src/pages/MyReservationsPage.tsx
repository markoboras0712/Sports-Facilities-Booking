import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import { navigate } from '@reach/router';
import { authSelectors } from 'modules/authentication';
import { useFirestore } from 'modules/firebase';
import { myReservations } from 'modules/reservations';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { ImageCardsCarousel, Navigation } from 'shared/components';

export const MyReservationsPage: React.FC = () => {
  const { getMyReservations } = useFirestore();
  const user = useRecoilValue(authSelectors.user);
  const reservations = useRecoilValue(myReservations);

  useEffect(() => {
    if (!user?.userUid) return;

    getMyReservations(user.userUid);
  }, [user]);

  if (!reservations) {
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
            MY RESERVATIONS
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 3, sm: 6, md: 12 }}
          >
            {reservations.length ? (
              reservations.map(
                (
                  {
                    facilityName,
                    address,
                    sportType,
                    imageUrls,
                    id,
                    capacity,
                    startTime,
                    endTime,
                    type,
                  },
                  index,
                ) => (
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
                      <ImageCardsCarousel imageUrls={imageUrls} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Facility name: {facilityName}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          Address: {address}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          Sport: {sportType.toUpperCase()}
                        </Typography>
                        <Typography
                          variant="h6"
                          color="text.secondary"
                          gutterBottom
                        >
                          Capacity: {capacity}
                        </Typography>
                        <Typography
                          variant="h6"
                          color="text.secondary"
                          gutterBottom
                        >
                          Reservation time: {startTime?.getHours()}
                          {':'}
                          {startTime?.getMinutes()} - {endTime?.getHours()}
                          {endTime?.getMinutes() === 0
                            ? ''
                            : `:${endTime?.getMinutes()}`}
                        </Typography>
                        <Typography
                          variant="h6"
                          color="text.secondary"
                          gutterBottom
                        >
                          Reservation type: {type}
                        </Typography>
                        <Button
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            py: 1,
                            px: 3.5,
                            mr: 5,
                          }}
                          variant="outlined"
                          onClick={() => navigate(`/facility/${id}`)}
                        >
                          Cancel reservation
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ),
              )
            ) : (
              <Typography variant="h6" sx={{ color: '#121212', mt: 4, pl: 2 }}>
                You haven't created any reservation yet. Please make a
                reservation on some sport facility first.
              </Typography>
            )}
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
