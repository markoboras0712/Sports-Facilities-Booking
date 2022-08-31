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
import { navigate, useLocation } from '@reach/router';
import { authSelectors } from 'modules/authentication';
import { settingsSelector } from 'modules/authorization';
import { Facility, selectedFacility } from 'modules/facilities';
import { useFirestore } from 'modules/firebase';
import { Reservation } from 'modules/reservations';
import { Routes } from 'modules/routing';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ImageCardsCarousel, Navigation } from 'shared/components';
import { useDeviceSizes, useToast } from 'shared/hooks';
import { isReservationTypeGuard } from 'shared/utils';

export const MakeReservationPage: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(new Date());
  const [endTime, setEndTime] = useState<Date | null>(new Date());
  const [startError, setStartError] = useState<DateTimeValidationError>();
  const [endError, setEndError] = useState<DateTimeValidationError>();
  const [open, setOpen] = useState(false);

  const { mobile } = useDeviceSizes();
  const location = useLocation();
  const state = isReservationTypeGuard(location) && location.state;
  const facilityId = state ? state.facilityId : '/';
  const userUid = state ? state.creatorId : '/';

  const settings = useRecoilValue(settingsSelector.settings);
  const user = useRecoilValue(authSelectors.user);
  const facility = useRecoilValue(selectedFacility);
  const { successToast, errorToast } = useToast();
  const { getFacility, createNotification, createReservation } = useFirestore();

  async function handleReservation(facility: Facility) {
    if (!user?.userUid) return;
    try {
      setLoading(true);
      const reservationData: Omit<Reservation, 'id'> = {
        facilityId: facility.id,
        creatorId: facility.creatorId,
        startTime,
        endTime,
        createdAt: new Date(),
        type: 'pending',
        address: facility.address,
        capacity: facility.capacity,
        reservationId: '',
        country: facility.country,
        sportType: facility.sportType,
        imageUrls: facility.imageUrls,
        facilityName: facility.facilityName,
      };

      const notificationId = await createNotification(
        user.userUid,
        reservationData,
      );
      await createReservation(user.userUid, reservationData, notificationId);
      successToast(
        'You have successfully created reservation! Checkout reservation type and look out for your notifications when facility owner accepts your reservation',
      );

      navigate(Routes.MyReservations);
      setLoading(false);
    } catch (error) {
      errorToast('Something went wrong! Please try again later');
    }
  }

  useEffect(() => {
    if (!userUid || !facilityId) return;

    getFacility(userUid, facilityId);
  }, [facilityId, userUid]);

  if (!facility) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <>
      <Navigation />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="h6"
          sx={{ color: '#939393', textTransform: 'uppercase', p: 8 }}
        >
          MAKE A RESERVATION
        </Typography>{' '}
        <Card sx={{ height: '100%', width: '80%' }}>
          <ImageCardsCarousel imageUrls={facility?.imageUrls} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {facility?.facilityName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {facility?.address}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {facility?.country || settings?.country}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {facility?.city}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {facility?.postalCode}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Open: {facility.startWorkingHour?.toLocaleTimeString()}
              {':'}
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
              onClick={() => setOpen(true)}
            >
              Select date and time
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
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <MobileDateTimePicker
                      value={startTime}
                      minutesStep={30}
                      onChange={newValue => {
                        setStartTime(newValue);
                      }}
                      label="Start date and time"
                      minDate={new Date()}
                      onError={error => setStartError(error)}
                      minTime={facility?.startWorkingHour}
                      maxTime={endTime}
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
                      minDate={startTime}
                      onError={error => setEndError(error)}
                      minTime={startTime}
                      maxTime={facility?.endWorkingHour}
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
                  disabled={Boolean(startError) || Boolean(endError)}
                  variant="outlined"
                  onClick={() => handleReservation(facility)}
                  fullWidth
                >
                  {loading ? 'Loading...' : 'Make a reservation'}
                </Button>
              </Box>
            </Modal>
            <IconButton
              onClick={() => setExpanded(!expanded)}
              aria-label="show more"
              sx={{ marginLeft: 'auto' }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              {facility.description && (
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Description: {facility?.description}
                </Typography>
              )}

              <Typography variant="h6" color="text.secondary" gutterBottom>
                Capacity: {facility?.capacity}
              </Typography>
              {facility?.price && (
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Price: ${facility.price} per hour
                </Typography>
              )}
              {facility?.sportType && (
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Sport: {facility?.sportType}
                </Typography>
              )}
              {facility?.phone && facility.phone.length > 5 && (
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Phone number: {facility?.phone}
                </Typography>
              )}
              {facility?.email && (
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Email address: {facility?.email}
                </Typography>
              )}
              {facility?.website && (
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  Website: {facility?.website}
                </Typography>
              )}
            </CardContent>
          </Collapse>
        </Card>
      </Grid>
    </>
  );
};
