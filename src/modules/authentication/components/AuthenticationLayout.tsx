import { createTheme, CssBaseline, Grid, ThemeProvider } from '@mui/material';
import React from 'react';

const theme = createTheme();

interface Props {
  children: React.ReactNode;
}

export const AuthenticationLayout: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {children}
      </Grid>
    </ThemeProvider>
  );
};
