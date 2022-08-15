import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { popularCards } from 'const';
import React from 'react';
import { useDeviceSizes } from 'shared/hooks';

export const PopularCards: React.FC = () => {
  const { mediumDeviceSize } = useDeviceSizes();

  return (
    <Grid item>
      <Box
        sx={{
          width: '100%',
          px: 8,
          pb: 15,
          pt: !mediumDeviceSize ? 5 : 20,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: '#939393', textTransform: 'uppercase' }}
          >
            Popular near you
          </Typography>
          <IconButton disabled>
            <Typography sx={{ color: '#0758A4' }}>See all</Typography>
            <ArrowForwardIosIcon sx={{ color: '#0758A4', mr: 3 }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            mt: 3.5,
          }}
        >
          <Grid container>
            {popularCards.map(
              ({ image, name, address, facilityType, price }, index) => (
                <Grid item key={index} xs={12} sm={6} md={6} lg={3}>
                  <Card
                    sx={{
                      maxWidth: 344,
                      borderRadius: 2,
                      mr: { sm: 3.5, md: 7, lg: 4 },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="220"
                      image={image}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h6">
                        {name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {address}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {facilityType}
                      </Typography>
                      <Typography gutterBottom>{price} HRK / hour</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ),
            )}
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};
