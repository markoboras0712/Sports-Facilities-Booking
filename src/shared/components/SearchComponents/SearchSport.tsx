import SearchIcon from '@mui/icons-material/Search';
import { Box, IconButton, InputBase, OutlinedInput } from '@mui/material';
import { searchFacilityInput } from 'modules/facilities';
import * as React from 'react';
import { useSetRecoilState } from 'recoil';
import { useDeviceSizes } from 'shared/hooks';

export const SearchSport: React.FC = () => {
  const { mediumDeviceSize } = useDeviceSizes();
  const setSearchFacilityInput = useSetRecoilState(searchFacilityInput);
  const handleChange = (e: { target: { value: string } }) => {
    setSearchFacilityInput(e.target.value);
  };

  return (
    <Box sx={{ display: 'flex', pl: 3, pr: 1.5 }}>
      {!mediumDeviceSize && (
        <>
          <IconButton disabled aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            type="search"
            onChange={handleChange}
            placeholder="Sport or venue name"
          />{' '}
        </>
      )}
      {mediumDeviceSize && (
        <OutlinedInput
          type="search"
          onChange={handleChange}
          fullWidth
          placeholder="Sport or venue name"
        />
      )}
    </Box>
  );
};
