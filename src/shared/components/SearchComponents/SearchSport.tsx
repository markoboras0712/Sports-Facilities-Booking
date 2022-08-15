import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputBase, OutlinedInput } from '@mui/material';
import React from 'react';
import { useDeviceSizes } from 'shared/hooks';

export const SearchSport: React.FC = () => {
  const { mediumDeviceSize } = useDeviceSizes();

  return (
    <Box sx={{ display: 'flex', pl: 3, pr: 1.5 }}>
      {!mediumDeviceSize && (
        <>
          <IconButton disabled aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase placeholder="Sport or venue name" />{' '}
        </>
      )}
      {mediumDeviceSize && (
        <OutlinedInput fullWidth placeholder="Sport or venue name" />
      )}
    </Box>
  );
};
