import { Box, IconButton, Typography } from '@mui/material';
import { navigate } from '@reach/router';
import { Sport } from 'const';
import { Routes } from 'modules/routing';
import * as React from 'react';
import { useDeviceSizes } from 'shared/hooks';

interface Props {
  sports: Sport[];
}

export const SuggestedSport: React.FC<Props> = ({ sports }) => {
  const { mediumDeviceSize } = useDeviceSizes();

  return (
    <>
      {sports.map(({ name, SportIcon }, index) => (
        <Box
          key={index}
          sx={{
            borderColor: mediumDeviceSize ? 'gray' : 'white',
            borderRadius: 2,
            cursor: 'pointer',
            display: 'flex',
            backgroundColor: 'white',
            border: 0,
            height: 44,
            boxShadow: !mediumDeviceSize
              ? '0px 4px 24px rgba(21, 44, 66, 0.1)'
              : 'none',
            py: 1.25,
            pr: 2,
            pl: 1,
          }}
          onClick={() =>
            navigate(Routes.QuickSearch, {
              state: {
                name,
              },
            })
          }
        >
          <IconButton sx={{ mr: 0.5 }} disabled>
            <SportIcon />
          </IconButton>
          <Typography>
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </Typography>
        </Box>
      ))}
    </>
  );
};
