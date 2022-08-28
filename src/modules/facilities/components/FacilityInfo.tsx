import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useFirebaseStorage } from 'modules/firebase';
import * as React from 'react';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { DropzoneDialog } from 'react-mui-dropzone';
import { availableSports } from '../const';
import { Facility } from '../models';

export const FacilityInfo: React.FC = () => {
  const { uploadBlobOrFile } = useFirebaseStorage();
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext<Facility>();

  const [startWork, setStartWork] = useState<Date | null>(
    getValues().startWorkingHour || null,
  );
  const [endWork, setEndWork] = useState<Date | null>(
    getValues().endWorkingHour || null,
  );
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  function saveFiles(files: File[]) {
    setLoading(true);
    setValue('files', files);
    const imageUrls: string[] = [];

    files.forEach(async file => {
      const imageUrlPromise = uploadBlobOrFile(
        file,
        getValues().facilityName,
        file.name,
      );
      const imageResult = await imageUrlPromise;

      imageUrls.push(imageResult);
      setValue('imageUrls', imageUrls);
    });
    setLoading(false);
    setOpen(false);
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography component="h1" variant="h5" sx={{ mt: 2 }}>
        Basic information of facility
      </Typography>
      <SettingsSuggestIcon />
      <Box sx={{ mt: 1 }}>
        <Box sx={{ mt: 1, display: 'flex' }}>
          <TextField
            margin="normal"
            {...register('facilityName', {
              required: 'Facility name is required.',
            })}
            sx={{ mr: 2, width: '50%' }}
            required
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
            defaultValue={getValues().sportType || 'football'}
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
            defaultValue={10}
            InputLabelProps={{ shrink: true }}
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
            defaultValue={0}
            sx={{ width: '50%' }}
            InputLabelProps={{ shrink: true }}
            error={errors.price !== undefined}
            id="price"
            helperText={errors.price?.message}
            label="Price"
            autoFocus
          />
        </Box>

        <TextField
          margin="normal"
          {...register('description')}
          fullWidth
          id="description"
          label="Description"
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
                setValue('startWorkingHour', newValue);
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
                setValue('endWorkingHour', newValue);
              }}
            />
          </LocalizationProvider>
        </Box>
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
          submitButtonText={loading ? 'Uploading...' : 'Upload'}
          dropzoneText={'Drag and drop an image here or click'}
          maxFileSize={5000000}
          open={open}
          initialFiles={getValues().files}
          onClose={() => setOpen(false)}
          onSave={saveFiles}
          showPreviews={true}
          showFileNamesInPreview={true}
        />
      </Box>
    </Grid>
  );
};
