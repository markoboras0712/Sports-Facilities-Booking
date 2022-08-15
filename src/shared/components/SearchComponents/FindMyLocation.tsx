import { Box, IconButton, InputBase, OutlinedInput } from '@mui/material';
import * as React from 'react';
import { useDeviceSizes } from 'shared/hooks';
import MyLocationIcon from '@mui/icons-material/MyLocation';

export const FindMyLocation: React.FC = () => {
  const { mediumDeviceSize } = useDeviceSizes();

  return (
    <Box sx={{ display: 'flex', pl: 3, pr: 1.5 }}>
      {!mediumDeviceSize && (
        <>
          <IconButton disabled>
            <MyLocationIcon />
          </IconButton>
          <InputBase placeholder="Find my location" />
        </>
      )}
      {mediumDeviceSize && (
        <OutlinedInput fullWidth placeholder="Find my location" />
      )}
    </Box>
  );
};
