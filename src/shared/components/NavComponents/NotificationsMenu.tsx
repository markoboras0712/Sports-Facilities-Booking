import { BigHead } from '@bigheads/core';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import NotificationImportantTwoToneIcon from '@mui/icons-material/NotificationImportantTwoTone';
import NotificationsPausedTwoToneIcon from '@mui/icons-material/NotificationsPausedTwoTone';
import {
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { navigate } from '@reach/router';
import { myNotifications } from 'modules/notifications';
import { Routes } from 'modules/routing';
import * as React from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useDeviceSizes } from 'shared/hooks';

export const NotificationsMenu: React.FC = () => {
  const [userMenuOpen, setUserMenuOpen] = useState<null | HTMLElement>(null);
  const { mobile } = useDeviceSizes();
  const notifications = useRecoilValue(myNotifications);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuOpen(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setUserMenuOpen(null);
  };

  return (
    <>
      <Menu
        sx={{ mt: '45px' }}
        id="menu-appbar"
        anchorEl={userMenuOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(userMenuOpen)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem sx={{ width: '100%' }} onClick={handleCloseUserMenu}>
          <List>
            {notifications && notifications.length ? (
              notifications.map((notification, index) => (
                <Box key={index}>
                  <ListItem
                    onClick={() => navigate(Routes.Notifications)}
                    alignItems="flex-start"
                  >
                    <ListItemAvatar>
                      <Box height={40} width={40}>
                        <BigHead {...(notification?.avatar as any)} />
                      </Box>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        mobile
                          ? `${notification.creatorName} has made ...`
                          : (notification.type === 'pending' &&
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
                          {notification.type === 'pending' ? (
                            <>
                              <IconButton
                                sx={{ color: 'green' }}
                                edge="end"
                                onClick={() => console.log('Confirm')}
                                aria-label="confirm"
                              >
                                <CheckIcon />
                              </IconButton>
                              <IconButton
                                sx={{ color: 'red' }}
                                edge="end"
                                onClick={() => console.log('Reject')}
                                aria-label="delete"
                              >
                                <ClearIcon />
                              </IconButton>
                            </>
                          ) : (
                            <></>
                          )}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </Box>
              ))
            ) : (
              <Typography variant="h6" sx={{ color: '#121212', p: 1 }}>
                You don't have any notification yet.
              </Typography>
            )}
          </List>
        </MenuItem>
      </Menu>
      <Tooltip title="Open notifications page">
        <IconButton onClick={handleOpenUserMenu}>
          {notifications?.length ? (
            <NotificationImportantTwoToneIcon sx={{ color: 'red' }} />
          ) : (
            <NotificationsPausedTwoToneIcon />
          )}
        </IconButton>
      </Tooltip>
    </>
  );
};
