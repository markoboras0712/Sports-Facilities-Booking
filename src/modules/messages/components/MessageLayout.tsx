import { Box, LinearProgress } from '@mui/material';
import { useParams } from '@reach/router';
import { authSelectors } from 'modules/authentication';
import { useFacilitiesRedirects } from 'modules/facilities';
import { useFirestore } from 'modules/firebase';
import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { myMessages, selectedChat } from '../store';
import { MessageBody } from './MessageBody';
import { MessageFooter } from './MessageFooter';
import { MessageHeader } from './MessageHeader';
import classes from './style/MessageLayout.module.css';

export const MessageLayout: React.FC = () => {
  const params = useParams();
  const layoutId = params.id;
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const { getMessagesForChat } = useFirestore();
  const { loading } = useFacilitiesRedirects();
  const messages = useRecoilValue(myMessages);
  const chat = useRecoilValue(selectedChat);
  const user = useRecoilValue(authSelectors.user);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!layoutId) return;

    if (typeof layoutId === 'string') getMessagesForChat(layoutId);
  }, [layoutId]);

  if (!messages || loading || !user || !chat) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <div className={classes.container}>
      <MessageHeader userName={chat.userName} avatarPhoto={chat.avatar} />
      <MessageBody messages={messages} />
      <MessageFooter to={chat.creatorId} chatId={layoutId} />
    </div>
  );
};
