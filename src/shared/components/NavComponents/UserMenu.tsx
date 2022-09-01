import { BigHead } from '@bigheads/core';
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { navigate, useLocation } from '@reach/router';
import { useAuthentication } from 'modules/authentication';
import { settingsSelector } from 'modules/authorization';
import { Routes } from 'modules/routing';
import * as React from 'react';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { useDeviceSizes } from 'shared/hooks';

export const UserMenu: React.FC = () => {
  const [userMenuOpen, setUserMenuOpen] = useState<null | HTMLElement>(null);
  const settings = useRecoilValue(settingsSelector.settings);
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
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography
            onClick={() => navigate(Routes.Profile)}
            textAlign="center"
            {...(pathname === Routes.Profile && { color: 'primary' })}
          >
            Profile
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleCloseUserMenu}>
          <Typography onClick={logout} textAlign="center">
            Logout
          </Typography>
        </MenuItem>
      </Menu>
      <Tooltip title="Open user menu">
        <IconButton onClick={handleOpenUserMenu} sx={{ py: mobile ? 1 : 0 }}>
          <Box height={40} width={40}>
            <BigHead {...(settings?.avatar as any)} />
          </Box>
        </IconButton>
      </Tooltip>
    </>
  );
};
