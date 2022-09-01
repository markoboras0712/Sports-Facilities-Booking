import { MessageLayout } from 'modules/messages';
import React from 'react';
import { Navigation } from 'shared/components';

export const ChatPage: React.FC = () => {
  return (
    <>
      <Navigation />
      <MessageLayout />
    </>
  );
};
