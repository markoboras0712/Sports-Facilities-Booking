import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material';
import { navigate } from '@reach/router';
import { settingsSelector } from 'modules/authorization';
import { availableFacilities } from 'modules/facilities';
import { Routes } from 'modules/routing';
import * as React from 'react';
import { useRecoilValue } from 'recoil';
import { useDeviceSizes } from 'shared/hooks';
import { ImageCardsCarousel } from '../ImageCardComponents';

export const PopularCards: React.FC = () => {
  const { mediumDeviceSize } = useDeviceSizes();
  const facilities = useRecoilValue(availableFacilities);
  const settings = useRecoilValue(settingsSelector.settings);
  const nearByFacilities = facilities?.filter(
    facility => facility.city === settings?.city,
  );

  if (!nearByFacilities && settings?.firstName) {
    return (
      <Box
        sx={{
          width: '100%',
          px: 8,
          pb: 15,
          pt: !mediumDeviceSize ? 5 : 20,
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {[...new Array(12)].map((_, index) => (
          <Skeleton
            key={index}
            sx={{ m: 4 }}
            variant="rectangular"
            width={344}
            height={172}
          />
        ))}
      </Box>
    );
  }

  if (!settings?.firstName || !nearByFacilities) {
    return (
      <Box
        sx={{
          width: '100%',
          px: 8,
          pb: 15,
          pt: !mediumDeviceSize ? 5 : 20,
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h6" sx={{ color: '#121212', mt: 4, pl: 2 }}>
          You aren't logged in. Please login first to see facilities near you
        </Typography>
      </Box>
    );
  }

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
          <IconButton
            onClick={() => navigate(Routes.AvailableFacilities)}
            sx={{ cursor: 'pointer' }}
          >
            <Typography sx={{ color: '#0758A4' }}>See all</Typography>
            <ArrowForwardIosIcon sx={{ color: '#0758A4' }} />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            mt: 3.5,
          }}
        >
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 3, sm: 6, md: 12 }}
          >
            {nearByFacilities.length ? (
              nearByFacilities.map((facility, index) => (
                <Grid
                  item
                  key={facility.id || index}
                  sx={{
                    mb: 2,
                  }}
                  xs={12}
                  sm={6}
                  md={6}
                  lg={3}
                >
                  <Card
                    sx={{
                      width: '100%',
                      borderRadius: 2,
                    }}
                  >
                    <ImageCardsCarousel imageUrls={facility.imageUrls} />
                    <CardContent>
                      <Typography gutterBottom variant="h6">
                        {facility.facilityName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {facility.address}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {facility.sportType}
                      </Typography>
                      <Typography gutterBottom>
                        ${facility.price}/hour
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography variant="h6" sx={{ color: '#121212', mt: 4, pl: 2 }}>
                There isn't any sport facility near {settings?.city} to
                reservate yet. Please check another time.
              </Typography>
            )}
          </Grid>
        </Box>
      </Box>
    </Grid>
  );
};
