import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import React from 'react';
import { Navigation } from 'shared/components';
import { useDeviceSizes } from 'shared/hooks';

export const NotificationsPage: React.FC = () => {
  const { mobile } = useDeviceSizes();

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
              <ListItem
                secondaryAction={
                  <>
                    <IconButton
                      sx={{ color: 'green' }}
                      edge="end"
                      aria-label="delete"
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
                }
                alignItems="flex-start"
              >
                <ListItemAvatar>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                </ListItemAvatar>
                <ListItemText
                  primary="Marko Boras has made reservation request on Sportska Dvorana Jug."
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
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
