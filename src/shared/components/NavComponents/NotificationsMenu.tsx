import { BigHead } from '@bigheads/core';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
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
                          : `${notification.creatorName} has made reservation request on ${notification.facilityName}.`
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
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </Box>
              ))
            ) : (
              <Typography variant="h6" sx={{ color: '#121212', mt: 4, pl: 2 }}>
                You don't have any notification yet. You can also check your
                notifications in upper right corner of navigation.
              </Typography>
            )}
          </List>
        </MenuItem>
      </Menu>
      <Tooltip title="Open notifications page">
        <IconButton onClick={handleOpenUserMenu}>
          <NotificationsNoneIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};
