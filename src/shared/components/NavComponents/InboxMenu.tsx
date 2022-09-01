import InboxIcon from '@mui/icons-material/Inbox';
import { IconButton, Tooltip } from '@mui/material';
import { navigate } from '@reach/router';
import { Routes } from 'modules/routing';
import * as React from 'react';

export const InboxMenu: React.FC = () => {
  return (
    <>
      <Tooltip title="Open notifications page">
        <IconButton onClick={() => navigate(Routes.Inbox)}>
          <InboxIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};
