import { BigHead } from '@bigheads/core';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import {
  Box,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { authSelectors } from 'modules/authentication';
import { useFacilitiesRedirects } from 'modules/facilities';
import { useFirestore } from 'modules/firebase';
import { myNotifications, Notification } from 'modules/notifications';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { Navigation } from 'shared/components';
import { useDeviceSizes } from 'shared/hooks';

export const NotificationsPage: React.FC = () => {
  const { mobile } = useDeviceSizes();
  const { loading } = useFacilitiesRedirects();
  const notifications = useRecoilValue(myNotifications);

  const user = useRecoilValue(authSelectors.user);
  const { acceptReservation, createChat, rejectReservation } = useFirestore();

  async function handleAcceptReservation(notification: Notification) {
    if (!user?.userUid) return;
    await acceptReservation(user.userUid, {
      ...notification,
      type: 'accepted',
    });
    await createChat(notification, user.userUid);
  }

  async function handleRejectReservation(notification: Notification) {
    if (!user?.userUid) return;
    await rejectReservation(user.userUid, {
      ...notification,
      type: 'rejected',
    });
  }

  if (!notifications || loading) {
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
        <Grid container>
          <Typography
            variant="h6"
            sx={{
              color: '#939393',
              px: mobile ? 4 : 20,
              textTransform: 'uppercase',
              py: 4,
            }}
          >
            NOTIFICATIONS
          </Typography>{' '}
          <List
            sx={{
              width: '100%',
              px: mobile ? 0 : 16,
              bgcolor: 'background.paper',
            }}
          >
            {notifications.length ? (
              notifications?.map((notification, index) => (
                <Box key={index}>
                  <ListItem
                    secondaryAction={
                      notification.type === 'pending' ? (
                        <>
                          <IconButton
                            sx={{ color: 'green' }}
                            edge="end"
                            onClick={() =>
                              handleAcceptReservation(notification)
                            }
                            aria-label="confirm"
                          >
                            <CheckIcon />
                          </IconButton>
                          <IconButton
                            sx={{ color: 'red' }}
                            edge="end"
                            aria-label="delete"
                            onClick={() =>
                              handleRejectReservation(notification)
                            }
                          >
                            <ClearIcon />
                          </IconButton>
                        </>
                      ) : (
                        <></>
                      )
                    }
                    alignItems="flex-start"
                  >
                    <ListItemAvatar sx={{ mr: mobile ? 0 : 4 }}>
                      <Box
                        sx={{ mb: 2 }}
                        height={mobile ? 40 : 80}
                        width={mobile ? 40 : 80}
                      >
                        <BigHead {...(notification?.avatar as any)} />
                      </Box>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <>
                          <Typography
                            sx={{ mt: !mobile ? 2 : 0 }}
                            variant={mobile ? `body2` : `h5`}
                            color="text.primary"
                          >
                            {notification.type === 'accepted' &&
                              notification.creatorId === user?.userUid &&
                              `Your reservation for ${notification.facilityName} is accepted. Check out your inbox if you have any questions for facility owner.`}
                            {notification.type === 'rejected' &&
                              notification.creatorId === user?.userUid &&
                              `Your reservation for ${notification.facilityName} is rejected. Check out your inbox if you have any questions for facility owner.`}
                            {notification.type === 'pending' &&
                              notification.creatorId !== user?.userUid &&
                              `${notification.creatorName} has made reservation request for ${notification.facilityName}`}
                            {notification.type === 'accepted' &&
                              notification.creatorId !== user?.userUid &&
                              `You have
                              accepted reservation of ${notification.creatorName} for ${notification.facilityName}`}
                            {notification.type === 'rejected' &&
                              notification.creatorId !== user?.userUid &&
                              `You have rejected reservation of ${notification.creatorName} for ${notification.facilityName}`}{' '}
                          </Typography>
                        </>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant={mobile ? `body2` : `h6`}
                            color="text.primary"
                          >
                            Reservation time:{' '}
                            {notification.startTime?.getHours()}
                            {notification.startTime?.getMinutes() === 0
                              ? ''
                              : `:${notification.startTime?.getMinutes()}`}{' '}
                            - {notification.endTime?.getHours()}
                            {notification.endTime?.getMinutes() === 0
                              ? ''
                              : `:${notification.endTime?.getMinutes()}`}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </Box>
              ))
            ) : (
              <Typography variant="h6" sx={{ color: '#121212', mt: 4, pl: 4 }}>
                You don't have any notification yet. You can also check your
                notifications in upper right corner of navigation.
              </Typography>
            )}
          </List>
        </Grid>
      </Grid>
    </>
  );
};
