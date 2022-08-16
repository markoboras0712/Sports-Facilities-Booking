import { BigHead } from '@bigheads/core';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import {
  Autocomplete,
  Box,
  Button,
  Grid,
  IconButton,
  LinearProgress,
  TextField,
} from '@mui/material';
import { countries } from 'const';
import { authSelectors } from 'modules/authentication';
import {
  getRandomOptions,
  OnboardingData,
  settingsSelector,
} from 'modules/authorization';
import { useFirestore } from 'modules/firebase';
import * as React from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Navigation } from 'shared/components';
import { useToast } from 'shared/hooks';

export const ProfilePage: React.FC = () => {
  const settings = useRecoilValue(settingsSelector.settings);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<OnboardingData>();

  const user = useRecoilValue(authSelectors.user);
  const setSettings = useSetRecoilState(settingsSelector.settings);
  const { updateUser } = useFirestore();
  const { successToast } = useToast();

  const handleNewAvatar = () => {
    if (settings) setSettings({ ...settings, avatar: getRandomOptions() });
  };

  const onSubmit = handleSubmit((data: OnboardingData) => {
    const updatedSettings: OnboardingData = {
      ...data,
      country: data.country || settings?.country,
      avatar: settings?.avatar,
      isOnboardingInProgress: false,
    };

    if (user?.userUid && updatedSettings) {
      setSettings(updatedSettings);
      updateUser(user.userUid, updatedSettings);
      successToast('Your profile has been updated successfully!');
    }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (user?.userUid === '' || !settings?.firstName) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <>
      <Navigation />
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Box sx={{ mb: 10 }} height={100} width={150}>
          <BigHead {...(settings?.avatar as any)} />{' '}
        </Box>
        <IconButton onClick={handleNewAvatar}>
          <ShuffleIcon sx={{ color: '#20476b', cursor: 'pointer' }} />
        </IconButton>

        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            {...register('firstName', {
              required: 'First name is required.',
            })}
            required
            fullWidth
            id="firstName"
            label="First Name"
            defaultValue={settings?.firstName}
            autoFocus
            InputLabelProps={{ shrink: true }}
            error={errors.firstName !== undefined}
            helperText={errors.firstName?.message}
          />
          <TextField
            margin="normal"
            {...register('lastName', {
              required: 'Last name is required.',
            })}
            required
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={errors.lastName !== undefined}
            defaultValue={settings?.lastName}
            id="lastName"
            helperText={errors.lastName?.message}
            label="Last Name"
            name="lastName"
            autoFocus
          />
          <TextField
            margin="normal"
            {...register('address', {
              required: 'Address is required.',
            })}
            required
            InputLabelProps={{ shrink: true }}
            fullWidth
            defaultValue={settings?.address}
            error={errors.address !== undefined}
            id="address"
            helperText={errors.address?.message}
            label="Address"
            autoFocus
          />
          <Autocomplete
            id="country"
            options={countries}
            limitTags={1}
            sx={{ mt: 1 }}
            autoHighlight
            getOptionLabel={option => option.label}
            defaultValue={countries.find(
              country => country.label === settings?.country,
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
            InputLabelProps={{ shrink: true }}
            error={errors.city !== undefined}
            defaultValue={settings?.city}
            id="city"
            helperText={errors.city?.message}
            label="City"
            autoFocus
          />
          <TextField
            margin="normal"
            {...register('postalCode')}
            fullWidth
            defaultValue={settings?.postalCode}
            InputLabelProps={{ shrink: true }}
            id="postalCode"
            label="Postal Code"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={onSubmit}
            sx={{ mt: 3, mb: 2 }}
          >
            Save
          </Button>
        </Box>
      </Grid>
    </>
  );
};
