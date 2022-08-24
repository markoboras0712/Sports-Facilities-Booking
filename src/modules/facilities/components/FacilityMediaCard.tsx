import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { Facility } from '../models';

export const FacilityMediaCard: React.FC = () => {
  const { getValues } = useFormContext<Facility>();

  const { facilityName, address, country, city, postalCode } = getValues();

  return (
    <Card sx={{ height: '100%', width: '100%', mr: 4 }}>
      <CardMedia
        component="img"
        height="280"
        image="https://source.unsplash.com/random"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {facilityName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {address}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {country}
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
