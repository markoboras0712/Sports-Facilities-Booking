import { Box, TextField } from '@mui/material';
import {
  DatePicker,
  LocalizationProvider,
  DesktopDatePicker,
} from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useState } from 'react';
import * as React from 'react';
import { useDeviceSizes } from 'shared/hooks';

export const CustomDatePicker: React.FC = () => {
  const [value, setValue] = useState<Date | null>(new Date());
  const { mediumDeviceSize } = useDeviceSizes();

  return (
    <Box sx={{ display: 'flex', pl: 3, pr: 1.5 }}>
      {mediumDeviceSize && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            value={value}
            openTo="year"
            views={['year', 'month', 'day']}
            InputAdornmentProps={{ position: 'start' }}
            onChange={newValue => {
              setValue(newValue);
            }}
            renderInput={params => <TextField {...params} fullWidth />}
          />
        </LocalizationProvider>
      )}
      {!mediumDeviceSize && (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            value={value}
            disableFuture
            InputProps={{
              disableUnderline: true,
            }}
            openTo="year"
            views={['year', 'month', 'day']}
            InputAdornmentProps={{ position: 'start' }}
            onChange={newValue => {
              setValue(newValue);
            }}
            renderInput={params => <TextField variant="standard" {...params} />}
          />
        </LocalizationProvider>
      )}
    </Box>
  );
};
