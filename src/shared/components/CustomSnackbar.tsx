import { Snackbar, Stack } from '@mui/material';
import React from 'react';
import { SetterOrUpdater } from 'recoil';
import { CustomAlert } from './CustomAlert';

interface Props {
  snackbarOpen: boolean;
  snackbarMessage?: string;
  errorCleanup: SetterOrUpdater<null>;
}

export const CustomizedSnackbars: React.FC<Props> = ({
  snackbarOpen,
  snackbarMessage,
  errorCleanup,
}) => {
  const clearErrors = () => errorCleanup(null);

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={clearErrors}
      >
        <CustomAlert
          onClose={clearErrors}
          severity="error"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </CustomAlert>
      </Snackbar>
    </Stack>
  );
};
