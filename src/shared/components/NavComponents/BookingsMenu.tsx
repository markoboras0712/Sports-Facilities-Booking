import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Menu, MenuItem, Tooltip, Typography } from '@mui/material';
import { navigate, useLocation } from '@reach/router';
import { navItemsLoggedUser, navItemsNotLoggedUser } from 'const';
import { authSelectors, useAuthentication } from 'modules/authentication';
import * as React from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useDeviceSizes } from 'shared/hooks';

export const BookingsMenu: React.FC = () => {
  const [userMenuOpen, setUserMenuOpen] = useState<null | HTMLElement>(null);
  const user = useRecoilValue(authSelectors.user);

  const { pathname } = useLocation();
  const { logout } = useAuthentication();
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
        {user?.userUid
          ? navItemsLoggedUser.map(({ item, link }) => (
              <MenuItem
                key={item}
                onClick={() => {
                  link ? navigate(link) : logout();
                  handleCloseUserMenu();
                }}
              >
                <Typography
                  textAlign="center"
                  {...(pathname === link && { color: 'primary' })}
                >
                  {item}
                </Typography>
              </MenuItem>
            ))
          : navItemsNotLoggedUser.map(({ item, link }) => (
              <MenuItem
                key={item}
                onClick={() => {
                  link ? navigate(link) : '';
                  handleCloseUserMenu();
                }}
              >
                <Typography
                  textAlign="center"
                  {...(pathname === link && { color: 'primary' })}
                >
                  {item}
                </Typography>
              </MenuItem>
            ))}
      </Menu>
      <Tooltip title="Open bookings menu">
        <Typography
          sx={{
            mr: mobile ? 1 : 4,
            display: { xs: 'none', sm: 'block' },
            alignContent: 'center',
            cursor: 'pointer',
          }}
          onClick={handleOpenUserMenu}
        >
          <SportsSoccerIcon />
        </Typography>
      </Tooltip>
    </>
  );
};
