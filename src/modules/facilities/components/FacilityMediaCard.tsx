import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { settingsSelector } from 'modules/authorization';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { Facility } from '../models';

export const FacilityMediaCard: React.FC = () => {
  const { getValues } = useFormContext<Facility>();
  const settings = useRecoilValue(settingsSelector.settings);

  const { facilityName, address, country, city, postalCode, imageUrls } =
    getValues();
  const firstImage = imageUrls && imageUrls[0];

  return (
    <Card sx={{ height: '100%', width: '100%', mr: 4 }}>
      <CardMedia
        component="img"
        height="280"
        image={firstImage || 'https://source.unsplash.com/random'}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {facilityName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {country || settings?.country}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {city}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {postalCode}
        </Typography>
      </CardContent>
    </Card>
  );
};
