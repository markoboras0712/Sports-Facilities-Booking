import { useMediaQuery, useTheme } from '@mui/material';

export function useDeviceSizes() {
  const theme = useTheme();

  const mobile = useMediaQuery(theme.breakpoints.down('sm'));
  const smallDeviceSize = useMediaQuery('(max-width:700px)');
  const mediumDeviceSize = useMediaQuery('(max-width:900px)');
  const tablet = useMediaQuery(theme.breakpoints.up('sm'));
  const laptop = useMediaQuery(theme.breakpoints.up('md'));

  return { mobile, tablet, laptop, smallDeviceSize, mediumDeviceSize };
}
