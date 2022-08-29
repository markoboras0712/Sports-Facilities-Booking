import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  LinearProgress,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useParams } from '@reach/router';
import { countries } from 'const';
import { authSelectors } from 'modules/authentication';
import { availableSports, Facility, myFacilities } from 'modules/facilities';
import { useFirestore } from 'modules/firebase';
import { MuiTelInput } from 'mui-tel-input';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { ImageCardsCarousel } from 'shared/components';

export const EditFacilityPage: React.FC = () => {
  const { getFacilities } = useFirestore();
  const user = useRecoilValue(authSelectors.user);
  const facilities = useRecoilValue(myFacilities);
  const params = useParams();
  const { id } = params;
  const selectedFacility = facilities?.find(facility => facility.id === id);
  console.log({ selectedFacility });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Facility>();
  const [startWork, setStartWork] = useState<Date | null>();
  const [endWork, setEndWork] = useState<Date | null>();

  const [number, setNumber] = useState(selectedFacility?.phone || '');

  const onSubmit = handleSubmit((data: Facility) => {
    if (!user?.userUid || !selectedFacility) return;

    const facilityData: Facility = {
      ...data,
      id: selectedFacility.id,
      creatorId: selectedFacility.creatorId,
      createdAt: selectedFacility.createdAt,
      updatedAt: new Date(),
      imageUrls: selectedFacility.imageUrls,
      startWorkingHour: startWork || new Date(),
      endWorkingHour: endWork || new Date(),
      phone: number,
    };
    console.log(facilityData);

    // const updatedSettings: OnboardingData = {
    //   ...data,
    //   country: data.country || settings?.country,
    //   avatar: settings?.avatar,
    //   isOnboardingInProgress: false,
    // };

    // if (user?.userUid && updatedSettings) {
    //   setSettings(updatedSettings);
    //   updateUser(user.userUid, updatedSettings);
    //   successToast('Your profile has been updated successfully!');
    // }
  });

  useEffect(() => {
    if (!user?.userUid) return;

    getFacilities(user.userUid);
  }, [user]);

  useEffect(() => {
    if (selectedFacility) {
      setStartWork(selectedFacility.startWorkingHour);
      setEndWork(selectedFacility.endWorkingHour);
      setNumber(selectedFacility?.phone || '');
    }
  }, [selectedFacility]);

  if (!facilities || !selectedFacility) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
          Edit facility
        </Typography>
        <RemoveRedEyeIcon />
        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column' }}>
          <Card sx={{ height: '100%', width: '100%', mr: 4 }}>
            <ImageCardsCarousel imageUrls={selectedFacility.imageUrls} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {selectedFacility.facilityName}
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ mt: 1, display: 'flex' }}>
            <TextField
              margin="normal"
              {...register('facilityName', {
                required: 'Facility name is required.',
              })}
              sx={{ mr: 2, width: '50%' }}
              required
              defaultValue={selectedFacility.facilityName}
              InputLabelProps={{ shrink: true }}
              error={errors.facilityName !== undefined}
              id="facilityName"
              helperText={errors.facilityName?.message}
              label="Facility Name"
              autoFocus
            />
            <TextField
              margin="normal"
              select
              {...register('sportType', {
                required: 'Sport type is required.',
              })}
              id="sportType"
              sx={{ width: '50%' }}
              label="Sport Type"
              InputLabelProps={{ shrink: true }}
              autoFocus
              helperText={errors.sportType?.message}
              required
              defaultValue={selectedFacility.sportType}
              error={errors.sportType !== undefined}
            >
              {availableSports.map((sport, index) => (
                <MenuItem key={index} value={sport}>
                  {sport[0].toUpperCase() + sport.substring(1)}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box sx={{ mt: 1, display: 'flex' }}>
            <TextField
              margin="normal"
              {...register('capacity', {
                required: 'Capacity is required.',
              })}
              type="number"
              sx={{ width: '50%', mr: 2 }}
              InputLabelProps={{ shrink: true }}
              defaultValue={selectedFacility.capacity}
              error={errors.capacity !== undefined}
              id="capacity"
              helperText={errors.capacity?.message}
              label="Capacity"
              autoFocus
            />
            <TextField
              margin="normal"
              {...register('price', {
                required: 'Price is required.',
              })}
              required
              type="number"
              fullWidth
              defaultValue={selectedFacility.price}
              sx={{ width: '50%' }}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              error={errors.price !== undefined}
              id="price"
              helperText={errors.price?.message}
              label="Price"
              autoFocus
            />
          </Box>
          <Box sx={{ mt: 1, display: 'flex' }}>
            <TextField
              margin="normal"
              {...register('address', {
                required: 'Address is required.',
              })}
              required
              sx={{ width: '50%', mr: 2 }}
              InputLabelProps={{ shrink: true }}
              error={errors.address !== undefined}
              id="address"
              defaultValue={selectedFacility.address}
              helperText={errors.address?.message}
              label="Address"
              autoFocus
            />
            <TextField
              margin="normal"
              {...register('city', {
                required: 'City is required.',
              })}
              required
              sx={{ width: '50%' }}
              defaultValue={selectedFacility.city}
              InputLabelProps={{ shrink: true }}
              error={errors.city !== undefined}
              id="city"
              helperText={errors.city?.message}
              label="City"
              autoFocus
            />
          </Box>
          <TextField
            margin="normal"
            {...register('postalCode')}
            fullWidth
            InputLabelProps={{ shrink: true }}
            id="postalCode"
            defaultValue={selectedFacility.postalCode}
            label="Postal Code"
            autoFocus
          />
          <Autocomplete
            id="country"
            options={countries}
            limitTags={1}
            sx={{ mt: 2 }}
            autoHighlight
            getOptionLabel={option => option.label}
            defaultValue={countries.find(
              country => country.label === selectedFacility.country,
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
            {...register('description')}
            fullWidth
            id="description"
            label="Description"
            defaultValue={selectedFacility.description}
            InputLabelProps={{ shrink: true }}
            multiline
            autoFocus
            rows={4}
            maxRows={8}
          />
          <Box sx={{ mt: 1, display: 'flex' }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                renderInput={props => (
                  <TextField
                    margin="normal"
                    required
                    sx={{ mr: 2, width: '50%' }}
                    id="startWorkingHour"
                    error={errors.startWorkingHour !== undefined}
                    helperText={errors.startWorkingHour?.message}
                    InputLabelProps={{ shrink: true }}
                    {...props}
                  />
                )}
                {...register('startWorkingHour', {
                  required: 'Start working hour is required.',
                })}
                label="Start working hour"
                value={startWork}
                onChange={newValue => {
                  setStartWork(newValue);
                }}
              />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                renderInput={props => (
                  <TextField
                    margin="normal"
                    required
                    sx={{ width: '50%' }}
                    id="endWorkingHour"
                    error={errors.endWorkingHour !== undefined}
                    helperText={errors.endWorkingHour?.message}
                    InputLabelProps={{ shrink: true }}
                    {...props}
                  />
                )}
                {...register('endWorkingHour', {
                  required: 'End working hour is required.',
                })}
                label="End working hour"
                value={endWork}
                onChange={newValue => {
                  setEndWork(newValue);
                }}
              />
            </LocalizationProvider>
          </Box>
          <TextField
            margin="normal"
            {...register('email')}
            InputLabelProps={{ shrink: true }}
            fullWidth
            error={errors.email !== undefined}
            id="email"
            defaultValue={selectedFacility.email}
            helperText={errors.email?.message}
            label="Email address"
            autoFocus
          />
          <TextField
            margin="normal"
            {...register('website')}
            fullWidth
            InputLabelProps={{ shrink: true }}
            error={errors.website !== undefined}
            defaultValue={selectedFacility.website}
            id="website"
            helperText={errors.website?.message}
            label="Website"
            autoFocus
          />
          <MuiTelInput
            value={number}
            sx={{ mt: 1 }}
            defaultCountry="HR"
            label="Phone number"
            {...register('phone')}
            fullWidth
            onChange={newValue => {
              setNumber(newValue);
            }}
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
