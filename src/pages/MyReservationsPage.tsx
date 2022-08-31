import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Modal,
  Typography,
} from '@mui/material';
import { authSelectors } from 'modules/authentication';
import { useFacilitiesRedirects } from 'modules/facilities';
import { useFirestore } from 'modules/firebase';
import { myReservations, Reservation } from 'modules/reservations';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ImageCardsCarousel, Navigation } from 'shared/components';
import { useDeviceSizes, useToast } from 'shared/hooks';

export const MyReservationsPage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { mobile } = useDeviceSizes();
  const [loading, setLoading] = useState(false);
  const { loading: userLoading } = useFacilitiesRedirects();
  const { deleteReservation, deleteNotification } = useFirestore();
  const { errorToast, successToast } = useToast();
  const user = useRecoilValue(authSelectors.user);
  const reservations = useRecoilValue(myReservations);

  async function handleCancelReservation(reservation: Reservation) {
    if (!user?.userUid) return;
    try {
      setLoading(true);

      await deleteReservation(user.userUid, reservation);
      await deleteNotification(reservation);
      successToast('You have successfully deleted your reservation!');
      setLoading(false);
      setOpen(false);
    } catch (error) {
      errorToast('Something went wrong! Please try again later');
    }
  }

  if (!reservations || userLoading) {
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
              reservations.map((reservation, index) => (
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
                    <ImageCardsCarousel imageUrls={reservation.imageUrls} />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        Facility name: {reservation.facilityName}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        Address: {reservation.address}
                      </Typography>
                      <Typography variant="h6" color="text.secondary">
                        Sport: {reservation.sportType.toUpperCase()}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        gutterBottom
                      >
                        Capacity: {reservation.capacity}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        gutterBottom
                      >
                        Reservation time: {reservation.startTime?.getHours()}
                        {reservation.startTime?.getMinutes() === 0
                          ? ''
                          : `:${reservation.startTime?.getMinutes()}`}{' '}
                        - {reservation.endTime?.getHours()}
                        {reservation.endTime?.getMinutes() === 0
                          ? ''
                          : `:${reservation.endTime?.getMinutes()}`}
                      </Typography>
                      <Typography
                        variant="h6"
                        color="text.secondary"
                        gutterBottom
                      >
                        Reservation type: {reservation.type}
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
                        onClick={() => setOpen(true)}
                      >
                        Cancel reservation
                      </Button>
                      <Modal
                        open={open}
                        onClose={() => setOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                      >
                        <Box
                          sx={{
                            position: 'absolute' as const,
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            bgcolor: 'background.paper',
                            boxShadow: 24,
                            width: mobile ? '300px' : '50%',
                            p: 4,
                            borderRadius: 2,
                          }}
                        >
                          <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            sx={{ mb: 2 }}
                          >
                            Are you sure you want to cancel your reservation?
                          </Typography>
                          <Box
                            sx={{
                              display: 'flex',
                              width: '100%',
                            }}
                          ></Box>
                          <Button
                            sx={{
                              borderRadius: 2,
                              textTransform: 'none',
                              py: 1,
                              px: 3.5,
                              mt: 2,
                            }}
                            variant="outlined"
                            color="error"
                            onClick={() => handleCancelReservation(reservation)}
                          >
                            {loading ? 'Loading...' : 'Yes, delete it'}
                          </Button>
                          <Button
                            sx={{
                              borderRadius: 2,
                              textTransform: 'none',
                              py: 1,
                              px: 3.5,
                              mt: 2,
                              ml: 2,
                            }}
                            variant="outlined"
                            onClick={() => setOpen(false)}
                          >
                            No, keep it
                          </Button>
                        </Box>
                      </Modal>
                    </CardContent>
                  </Card>
                </Grid>
              ))
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
