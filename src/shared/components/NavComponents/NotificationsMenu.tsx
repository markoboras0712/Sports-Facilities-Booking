import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {
  Avatar,
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
import { Routes } from 'modules/routing';
import * as React from 'react';
import { useState } from 'react';
import { useDeviceSizes } from 'shared/hooks';

export const NotificationsMenu: React.FC = () => {
  const [userMenuOpen, setUserMenuOpen] = useState<null | HTMLElement>(null);
  const { mobile } = useDeviceSizes();

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
            <ListItem
              onClick={() => navigate(Routes.Notifications)}
              alignItems="flex-start"
            >
              <ListItemAvatar>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText
                primary={
                  mobile
                    ? 'Marko Boras has made....'
                    : 'Marko Boras has made reservation request on Sportska Dvorana Jug.'
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: 'inline' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      11:00 - 13:00
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
