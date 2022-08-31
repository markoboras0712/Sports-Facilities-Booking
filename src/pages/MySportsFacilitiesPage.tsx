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
import { navigate } from '@reach/router';
import { authSelectors } from 'modules/authentication';
import {
  Facility,
  myFacilities,
  useFacilitiesRedirects,
} from 'modules/facilities';
import { useFirestore } from 'modules/firebase';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ImageCardsCarousel, Navigation } from 'shared/components';
import { useDeviceSizes, useToast } from 'shared/hooks';

export const MySportsFacilitiesPage: React.FC = () => {
  const facilities = useRecoilValue(myFacilities);
  const user = useRecoilValue(authSelectors.user);
  const { deleteNotification, deleteReservationForFacility, deleteFacility } =
    useFirestore();
  const { loading: userLoading } = useFacilitiesRedirects();
  const { mobile } = useDeviceSizes();
  const { successToast, errorToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  async function handleDeleteFacility(facility: Facility) {
    if (!user?.userUid) return;
    try {
      setLoading(true);
      if (facility.reservedTimes) {
        facility.reservedTimes.forEach(async reservation => {
          if (!reservation.reservationCreatorId) return;
          await deleteReservationForFacility(
            reservation.reservationCreatorId,
            reservation,
          );
          await deleteNotification(reservation);
        });
      }
      await deleteFacility(user.userUid, facility);
      successToast('You have successfully deleted your facility!');
      setLoading(false);
      setOpen(false);
    } catch (error) {
      errorToast('Something went wrong! Please try again later');
    }
  }

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
            MY SPORT FACILITIES
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
                        {facility.price} $ per hour
                      </Typography>
                      <Button
                        sx={{
                          borderRadius: 2,
                          textTransform: 'none',
                          py: 1,
                          px: 3.5,
                          mr: 2,
                        }}
                        variant="outlined"
                        onClick={() => navigate(`/facility/${facility.id}`)}
                      >
                        Edit
                      </Button>
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
                        Delete
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
                            Are you sure you want to delete this facility?
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
                            onClick={() => handleDeleteFacility(facility)}
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
