/* eslint-disable @typescript-eslint/no-unused-vars */
import EditIcon from '@mui/icons-material/Edit';
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
import { navigate, useParams } from '@reach/router';
import { countries } from 'const';
import { authSelectors } from 'modules/authentication';
import {
  availableSports,
  Facility,
  myFacilities,
  useFacilitiesRedirects,
} from 'modules/facilities';
import { useFirebaseStorage, useFirestore } from 'modules/firebase';
import { Routes } from 'modules/routing';
import { MuiTelInput } from 'mui-tel-input';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { DropzoneDialog } from 'react-mui-dropzone';
import { useRecoilValue } from 'recoil';
import { ImageCardsCarousel, Navigation } from 'shared/components';
import { useToast } from 'shared/hooks';

export const EditFacilityPage: React.FC = () => {
  const { updateFacility } = useFirestore();
  const { uploadBlobOrFile } = useFirebaseStorage();
  const { loading } = useFacilitiesRedirects();
  const user = useRecoilValue(authSelectors.user);
  const facilities = useRecoilValue(myFacilities);
  const params = useParams();
  const { successToast } = useToast();
  const { id } = params;
  const selectedFacility = facilities?.find(facility => facility.id === id);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<Facility>();
  const [startWork, setStartWork] = useState<Date | null>();
  const [endWork, setEndWork] = useState<Date | null>();
  const [open, setOpen] = useState(false);
  const [number, setNumber] = useState(selectedFacility?.phone || '');

  function saveFiles(files: File[]) {
    if (!selectedFacility) return;
    setValue('files', files);
    const imageUrls: string[] = [];

    files.forEach(async file => {
      const imageUrlPromise = uploadBlobOrFile(
        file,
        selectedFacility?.facilityName || '',
        file.name,
      );
      const imageResult = await imageUrlPromise;

      imageUrls.push(imageResult);
      selectedFacility.imageUrls?.push(imageResult);
      setValue('imageUrls', imageUrls);
    });
    setOpen(false);
  }

  const onSubmit = handleSubmit((data: Facility) => {
    if (!user?.userUid || !selectedFacility) return;

    const { files, ...restData } = data;

    const facilityData: Facility = {
      ...restData,
      id: selectedFacility.id,
      creatorId: selectedFacility.creatorId,
      createdAt: selectedFacility.createdAt,
      updatedAt: new Date(),
      imageUrls: selectedFacility.imageUrls,
      startWorkingHour: startWork || new Date(),
      endWorkingHour: endWork || new Date(),
      phone: number,
    };
    updateFacility(user.userUid, selectedFacility.id, facilityData);
    successToast('Your facility has been updated successfully!');
    navigate(Routes.MySportFacilities);
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (selectedFacility) {
      setStartWork(selectedFacility.startWorkingHour);
      setEndWork(selectedFacility.endWorkingHour);
      setNumber(selectedFacility?.phone || '');
    }
  }, [selectedFacility]);

  if (!facilities || !selectedFacility || loading) {
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
        <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
          Edit facility
        </Typography>
        <EditIcon />
        <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column' }}>
          <Card sx={{ height: '100%', width: '100%', mr: 4 }}>
            <ImageCardsCarousel imageUrls={selectedFacility.imageUrls} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {selectedFacility.facilityName}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                onClick={() => setOpen(true)}
              >
                Add Images
              </Button>

              <DropzoneDialog
                acceptedFiles={['image/*']}
                cancelButtonText={'cancel'}
                submitButtonText={'Upload'}
                dropzoneText={'Drag and drop an image here or click'}
                maxFileSize={5000000}
                open={open}
                showFileNames
                onClose={() => setOpen(false)}
                onSave={saveFiles}
              />
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
