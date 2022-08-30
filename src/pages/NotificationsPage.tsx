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
import { useFirestore } from 'modules/firebase';
import { myNotifications, Notification } from 'modules/notifications';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { Navigation } from 'shared/components';
import { useDeviceSizes } from 'shared/hooks';

export const NotificationsPage: React.FC = () => {
  const { mobile } = useDeviceSizes();
  const notifications = useRecoilValue(myNotifications);
  const user = useRecoilValue(authSelectors.user);
  const { acceptReservation } = useFirestore();

  async function handleAcceptReservation(notification: Notification) {
    if (!user?.userUid) return;
    await acceptReservation(user.userUid, {
      ...notification,
      type: 'accepted',
    });
  }

  console.log({ notifications });

  if (!notifications) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <>
      <Navigation />
      <Grid sx={{ px: !mobile ? 12 : 0, py: 4 }} container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: mobile ? '100%' : '50%',
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: '#939393', textTransform: 'uppercase', mb: 4 }}
          >
            NOTIFICATIONS
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 3, sm: 6, md: 12 }}
          >
            <List
              sx={{
                width: '100%',
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
                      <ListItemAvatar>
                        <Box height={40} width={40}>
                          <BigHead {...(notification?.avatar as any)} />
                        </Box>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          (notification.type === 'pending' &&
                            `${notification.creatorName} has made reservation request for ${notification.facilityName}`) ||
                          (notification.type === 'accepted' &&
                            `You have accepted reservation of ${notification.creatorName} for ${notification.facilityName}`) ||
                          (notification.type === 'rejected' &&
                            `You have rejected reservation of ${notification.creatorName} for ${notification.facilityName}`)
                        }
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: 'inline' }}
                              component="span"
                              variant="body2"
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
                <Typography
                  variant="h6"
                  sx={{ color: '#121212', mt: 4, pl: 4 }}
                >
                  You don't have any notification yet. You can also check your
                  notifications in upper right corner of navigation.
                </Typography>
              )}
            </List>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
