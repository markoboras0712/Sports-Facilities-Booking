import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  LinearProgress,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import {
  LocalizationProvider,
  MobileDateTimePicker,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimeValidationError } from '@mui/x-date-pickers/internals/hooks/validation/useDateTimeValidation';
import { navigate } from '@reach/router';
import { authSelectors } from 'modules/authentication';
import { availableFacilities } from 'modules/facilities';
import { useFirebaseFunctions, useFirestore } from 'modules/firebase';
import { Reservation } from 'modules/reservations';
import { Routes } from 'modules/routing';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ImageCardsCarousel, Navigation } from 'shared/components';
import { useDeviceSizes } from 'shared/hooks';

export const AvailableSportsFacilitiesPage: React.FC = () => {
  const [expandedId, setExpandedId] = useState(-1);
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(new Date());
  const [startError, setStartError] = useState<DateTimeValidationError>();
  const [endError, setEndError] = useState<DateTimeValidationError>();
  const [open, setOpen] = useState(false);
  const { mobile } = useDeviceSizes();

  const { getFacilities } = useFirebaseFunctions();
  const { createReservation } = useFirestore();

  const user = useRecoilValue(authSelectors.user);
  const facilities = useRecoilValue(availableFacilities);

  useEffect(() => {
    if (!user?.userUid) return;

    getFacilities();
  }, [user]);

  async function handleReservation(facilityId: string, creatorId: string) {
    if (!user?.userUid) return;

    console.log('handleReservation', startTime, endTime, facilityId, creatorId);
    const reservationData: Omit<Reservation, 'id'> = {
      facilityId,
      creatorId,
      startTime,
      endTime,
      createdAt: new Date(),
    };
    const reservationId = await createReservation(
      user.userUid,
      reservationData,
    );
    console.log(reservationId);
    navigate(Routes.MyReservations);
  }

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
            AVAILABLE SPORT FACILITIES FOR RESERVATION
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 3, sm: 6, md: 12 }}
          >
            {facilities.length ? (
              facilities.map(
                (
                  {
                    facilityName,
                    address,
                    sportType,
                    price,
                    imageUrls,
                    id,
                    creatorId,
                    startWorkingHour,
                    endWorkingHour,
                    capacity,
                    description,
                    city,
                    postalCode,
                    country,
                    phone,
                    email,
                    website,
                  },
                  index,
                ) => (
                  <Grid
                    item
                    key={id}
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
                          ${price} per hour
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
                          onClick={() => setOpen(true)}
                        >
                          Date and time for reservation
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
                              width: mobile ? '300px' : '60%',
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
                              Select start and end date and time
                            </Typography>
                            <Box
                              sx={{
                                display: 'flex',
                                width: '100%',
                              }}
                            >
                              <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                              >
                                <MobileDateTimePicker
                                  value={startTime}
                                  minutesStep={30}
                                  onChange={newValue => {
                                    setStartTime(newValue);
                                  }}
                                  label="Start date and time"
                                  minDate={new Date()}
                                  onError={error => setStartError(error)}
                                  minTime={startWorkingHour}
                                  maxTime={endWorkingHour}
                                  inputFormat="yyyy/MM/dd hh:mm a"
                                  mask="___/__/__ __:__ _M"
                                  renderInput={params => (
                                    <TextField
                                      sx={{ width: '50%' }}
                                      variant="outlined"
                                      {...params}
                                    />
                                  )}
                                />
                                <MobileDateTimePicker
                                  value={endTime}
                                  minutesStep={30}
                                  onChange={newValue => {
                                    setEndTime(newValue);
                                  }}
                                  label="End date and time"
                                  minDate={new Date()}
                                  onError={error => setEndError(error)}
                                  minTime={startWorkingHour}
                                  maxTime={endWorkingHour}
                                  inputFormat="yyyy/MM/dd hh:mm a"
                                  mask="___/__/__ __:__ _M"
                                  renderInput={params => (
                                    <TextField
                                      sx={{ ml: 2, width: '50%' }}
                                      variant="outlined"
                                      {...params}
                                    />
                                  )}
                                />
                              </LocalizationProvider>
                            </Box>
                            <Button
                              sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                                py: 1,
                                px: 3.5,
                                mt: 2,
                              }}
                              disabled={
                                Boolean(startError) || Boolean(endError)
                              }
                              variant="outlined"
                              onClick={() => handleReservation(id, creatorId)}
                              fullWidth
                            >
                              Make a reservation
                            </Button>
                          </Box>
                        </Modal>

                        <IconButton
                          onClick={() =>
                            setExpandedId(expandedId === index ? -1 : index)
                          }
                          aria-expanded={expandedId === index}
                          aria-label="show more"
                          sx={{ marginLeft: 'auto' }}
                        >
                          <ExpandMoreIcon />
                        </IconButton>
                      </CardActions>
                      <Collapse
                        in={expandedId === index}
                        timeout="auto"
                        unmountOnExit
                      >
                        <CardContent>
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            gutterBottom
                          >
                            Description: {description}
                          </Typography>
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            gutterBottom
                          >
                            Start working hour:{' '}
                            {startWorkingHour?.toLocaleTimeString()}
                          </Typography>
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            gutterBottom
                          >
                            End working hour:{' '}
                            {endWorkingHour?.toLocaleTimeString()}
                          </Typography>
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            gutterBottom
                          >
                            Capacity: {capacity}
                          </Typography>
                          {city && (
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              gutterBottom
                            >
                              City: {city}
                            </Typography>
                          )}
                          {postalCode && (
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              gutterBottom
                            >
                              ZIP: {postalCode}
                            </Typography>
                          )}
                          {country && (
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              gutterBottom
                            >
                              Country: {country}
                            </Typography>
                          )}
                          {phone && (
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              gutterBottom
                            >
                              Phone number: {phone}
                            </Typography>
                          )}
                          {email && (
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              gutterBottom
                            >
                              Email address: {email}
                            </Typography>
                          )}
                          {website && (
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              gutterBottom
                            >
                              Website: {website}
                            </Typography>
                          )}
                        </CardContent>
                      </Collapse>
                    </Card>
                  </Grid>
                ),
              )
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
