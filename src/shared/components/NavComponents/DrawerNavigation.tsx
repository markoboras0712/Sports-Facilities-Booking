import MenuIcon from '@mui/icons-material/Menu';
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import { Box, Drawer, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import * as React from 'react';
import { useDeviceSizes } from 'shared/hooks';
import { CustomDrawer } from './CustomDrawer';
import { navigate } from '@reach/router';
import { Routes } from 'modules/routing';

export const DrawerNavigation: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { mobile } = useDeviceSizes();
  const container =
    window !== undefined ? () => window.document.body : undefined;
  const drawerWidth = 240;

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box
      sx={{
        pl: mobile ? 4 : 8,
        py: 3.25,
        display: 'flex',
        justifyContent: 'flex-start',
      }}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        sx={{
          display: {
            sm: 'none',
          },
        }}
        onClick={handleDrawerToggle}
      >
        <MenuIcon />
      </IconButton>
      <Typography
        sx={{
          mr: mobile ? 1 : 4,
          display: { xs: 'none', sm: 'block' },
          alignContent: 'center',
          cursor: 'pointer',
        }}
        onClick={() => navigate(Routes.Landing)}
      >
        <SportsSoccerIcon />
      </Typography>
      <Typography
        sx={{
          display: { xs: 'none', sm: 'block', cursor: 'pointer' },
        }}
        onClick={() => navigate(Routes.Landing)}
      >
        Bookings
      </Typography>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <CustomDrawer handleDrawerToggle={handleDrawerToggle} />
        </Drawer>
      </Box>
    </Box>
  );
};
