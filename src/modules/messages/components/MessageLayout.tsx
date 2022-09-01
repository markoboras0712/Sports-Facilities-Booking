import { Box, LinearProgress } from '@mui/material';
import { useParams } from '@reach/router';
import { authSelectors } from 'modules/authentication';
import { useFacilitiesRedirects } from 'modules/facilities';
import { useFirestore } from 'modules/firebase';
import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { myMessages } from '../store';
import { MessageBody } from './MessageBody';
import { MessageFooter } from './MessageFooter';
import { MessageHeader } from './MessageHeader';
import classes from './style/MessageLayout.module.css';

export const MessageLayout: React.FC = () => {
  const params = useParams();
  const layoutId = params.id;
  const { getMessagesForChat } = useFirestore();
  const { loading } = useFacilitiesRedirects();
  const messages = useRecoilValue(myMessages);
  const user = useRecoilValue(authSelectors.user);
  console.log({ messages });

  const messagesEndRef = useRef<null | HTMLDivElement>(null);
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

  if (!messages || loading || !user) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <div className={classes.container}>
      <MessageHeader
        userName={'Marko Boras'}
        userPhoto={
          'https://firebasestorage.googleapis.com/v0/b/sports-facilities-110e2.appspot.com/o/Sportska%20Dvorana%20Jug%2Fdownload%20(1).jpeg?alt=media&token=be00d864-e541-4bbb-af97-74a3391a9e28'
        }
      />
      <MessageBody messages={messages} />
      <MessageFooter />
    </div>
  );
};
