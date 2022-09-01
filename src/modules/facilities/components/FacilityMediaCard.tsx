import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { settingsSelector } from 'modules/authorization';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { ImageCardsCarousel } from 'shared/components';
import { Facility } from '../models';

export const FacilityMediaCard: React.FC = () => {
  const { getValues } = useFormContext<Facility>();
  const settings = useRecoilValue(settingsSelector.settings);

  const { facilityName, address, country, city, postalCode, imageUrls } =
    getValues();

  return (
    <Card sx={{ height: '100%', width: '100%', mr: 4 }}>
      <ImageCardsCarousel imageUrls={imageUrls} />
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
