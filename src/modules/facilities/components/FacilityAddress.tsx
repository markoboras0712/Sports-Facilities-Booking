import { Autocomplete, Box, Grid, TextField, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { countries } from 'const';
import { Facility } from '../models';
import { useRecoilValue } from 'recoil';
import { settingsSelector } from 'modules/authorization';
import { useState } from 'react';

export const FacilityAddress: React.FC = () => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext<Facility>();

  const settings = useRecoilValue(settingsSelector.settings);
  const [selectedCountry] = useState<string | undefined>(
    getValues().country || settings?.country,
  );

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
        Address
      </Typography>
      <HomeIcon />
      <Box sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          {...register('address', {
            required: 'Address is required.',
          })}
          required
          InputLabelProps={{ shrink: true }}
          fullWidth
          error={errors.address !== undefined}
          id="address"
          defaultValue={settings?.address}
          helperText={errors.address?.message}
          label="Address"
          autoFocus
        />
        <Autocomplete
          id="country"
          options={countries}
          limitTags={1}
          autoHighlight
          getOptionLabel={option => option.label}
          defaultValue={countries.find(
            country => country.label === selectedCountry,
          )}
          renderOption={(props, option) => (
            <Box
              component="li"
              sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
              {...props}
            >
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt=""
              />
              {option.label} ({option.code}) +{option.phone}
            </Box>
          )}
          renderInput={params => (
            <TextField
              {...params}
              {...register('country')}
              InputLabelProps={{ shrink: true }}
              error={errors.country !== undefined}
              helperText={errors.country?.message}
              label="Choose a country"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />
        <TextField
          margin="normal"
          {...register('city', {
            required: 'City is required.',
          })}
          required
          fullWidth
          defaultValue={settings?.city}
          InputLabelProps={{ shrink: true }}
          error={errors.city !== undefined}
          id="city"
          helperText={errors.city?.message}
          label="City"
          autoFocus
        />
        <TextField
          margin="normal"
          {...register('postalCode')}
          fullWidth
          InputLabelProps={{ shrink: true }}
          id="postalCode"
          defaultValue={settings?.postalCode}
          label="Postal Code"
          autoFocus
        />
      </Box>
    </Grid>
  );
};
