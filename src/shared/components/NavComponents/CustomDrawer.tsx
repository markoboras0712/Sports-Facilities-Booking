import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import * as React from 'react';

interface Props {
  handleDrawerToggle: () => void;
}

export const CustomDrawer: React.FC<Props> = ({ handleDrawerToggle }) => {
  const navItems = ['My Bookings', 'Host Facility', 'Profile', 'Logout'];

  return (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 3.25 }}>
        Sports Facility Booking
      </Typography>
      <Divider />
      <List>
        {navItems.map(item => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
