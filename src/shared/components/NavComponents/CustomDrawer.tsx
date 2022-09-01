import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { navigate, useLocation } from '@reach/router';
import { navItemsLoggedUser, navItemsNotLoggedUser } from 'const';
import { authSelectors, useAuthentication } from 'modules/authentication';
import * as React from 'react';
import { useRecoilValue } from 'recoil';

interface Props {
  handleDrawerToggle: () => void;
}

export const CustomDrawer: React.FC<Props> = ({ handleDrawerToggle }) => {
  const user = useRecoilValue(authSelectors.user);
  const { logout } = useAuthentication();
  const { pathname } = useLocation();

  return (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 3.25 }}>
        Sports Facility Booking
      </Typography>
      <Divider />
      <List>
        {user?.userUid
          ? navItemsLoggedUser.map(({ item, link }) => (
              <ListItem
                key={item}
                selected={link === pathname}
                disablePadding
                onClick={() => {
                  link ? navigate(link) : logout();
                }}
              >
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))
          : navItemsNotLoggedUser.map(({ item, link }) => (
              <ListItem
                key={item}
                selected={link === pathname}
                disablePadding
                onClick={() => {
                  link ? navigate(link) : '';
                }}
              >
                <ListItemButton sx={{ textAlign: 'center' }}>
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
      </List>
    </Box>
  );
};
