import {
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import * as React from 'react';
import { useDeviceSizes } from 'shared/hooks';

export const UserMenu: React.FC = () => {
  const settings = ['Profile', 'Logout'];
  const { mobile } = useDeviceSizes();
  const [userMenuOpen, setUserMenuOpen] = useState<null | HTMLElement>(null);

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
        {settings.map(setting => (
          <MenuItem key={setting} onClick={handleCloseUserMenu}>
            <Typography textAlign="center">{setting}</Typography>
          </MenuItem>
        ))}
      </Menu>
      <Tooltip title="Open user menu">
        <IconButton onClick={handleOpenUserMenu} sx={{ py: mobile ? 1 : 0 }}>
          <Avatar
            src="https://wallpaper.dog/large/735939.jpg"
            sx={{ width: 40, height: 40 }}
          />
        </IconButton>
      </Tooltip>
    </>
  );
};
