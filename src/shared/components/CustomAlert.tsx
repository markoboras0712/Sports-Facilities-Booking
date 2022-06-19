import MuiAlert, { AlertProps } from '@mui/material/Alert';
import React from 'react';

export const CustomAlert = React.forwardRef<HTMLDivElement, AlertProps>(
  function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  },
);
