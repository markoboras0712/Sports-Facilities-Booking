import { BigHead } from '@bigheads/core';
import {
  Box,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material';
import { navigate } from '@reach/router';
import { useFacilitiesRedirects } from 'modules/facilities';
import { myChats, selectedChat } from 'modules/messages';
import { myNotifications } from 'modules/notifications';
import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Navigation } from 'shared/components';
import { useDeviceSizes } from 'shared/hooks';

export const InboxPage: React.FC = () => {
  const { mobile } = useDeviceSizes();
  const { loading } = useFacilitiesRedirects();
  const notifications = useRecoilValue(myNotifications);
  const chats = useRecoilValue(myChats);
  const setSelectedChat = useSetRecoilState(selectedChat);

  const chatsAndNotifications =
    chats &&
    notifications &&
    chats.map((chat, index) => {
      const otherData = {
        facilityId: notifications[index].facilityId,
        facilityName: notifications[index].facilityName,
        createdAt: notifications[index].createdAt,
        startTime: notifications[index].startTime,
        endTime: notifications[index].endTime,
      };
      return { ...chat, ...otherData };
    });

  if (!chatsAndNotifications || loading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <>
      <Navigation />

      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid container>
          <Typography
            variant="h6"
            sx={{
              color: '#939393',
              px: mobile ? 4 : 20,
              textTransform: 'uppercase',
              py: 4,
            }}
          >
            INBOX
          </Typography>{' '}
          <List
            sx={{
              width: '100%',
              px: mobile ? 0 : 16,
              bgcolor: 'background.paper',
            }}
          >
            {chatsAndNotifications.length ? (
              chatsAndNotifications?.map((item, index) => (
                <Box key={item.id || index}>
                  <ListItem
                    onClick={() => {
                      setSelectedChat(item);
                      navigate(`messages/${item.id}`);
                    }}
                    sx={{ cursor: 'pointer' }}
                    alignItems="flex-start"
                  >
                    <ListItemAvatar sx={{ mr: mobile ? 0 : 4 }}>
                      <Box
                        sx={{ mb: 2 }}
                        height={mobile ? 40 : 80}
                        width={mobile ? 40 : 80}
                      >
                        <BigHead {...(item?.avatar as any)} />
                      </Box>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <>
                          <Typography
                            sx={{ mt: !mobile ? 2 : 0 }}
                            variant={mobile ? `body2` : `h5`}
                            color="text.primary"
                          >
                            {item.facilityName}
                          </Typography>
                        </>
                      }
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant={mobile ? `body2` : `h6`}
                            color="text.primary"
                          >
                            Reservation time: {item.startTime?.getHours()}
                            {item.startTime?.getMinutes() === 0
                              ? ''
                              : `:${item.startTime?.getMinutes()}`}{' '}
                            - {item.endTime?.getHours()}
                            {item.endTime?.getMinutes() === 0
                              ? ''
                              : `:${item.endTime?.getMinutes()}`}
                          </Typography>
                          <br />
                          <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant={mobile ? `body2` : `h6`}
                            color="text.primary"
                          >
                            {item.userName}
                          </Typography>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </Box>
              ))
            ) : (
              <Typography variant="h6" sx={{ color: '#121212', mt: 4, pl: 4 }}>
                You don't have any chat yet. You can also check your
                notifications in upper right corner of navigation.
              </Typography>
            )}
          </List>
        </Grid>
      </Grid>
    </>
  );
};
