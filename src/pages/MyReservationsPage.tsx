import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import { navigate } from '@reach/router';
import { authSelectors } from 'modules/authentication';
import { myFacilities } from 'modules/facilities';
import { useFirestore } from 'modules/firebase';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { ImageCardsCarousel, Navigation } from 'shared/components';

export const MyReservationsPage: React.FC = () => {
  const { getMyFacilities } = useFirestore();
  const user = useRecoilValue(authSelectors.user);
  const facilities = useRecoilValue(myFacilities);

  useEffect(() => {
    if (!user?.userUid) return;

    getMyFacilities(user.userUid);
  }, [user]);

  if (!facilities) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <>
      <Navigation />
      <Grid sx={{ px: 8, py: 4 }} container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Typography
            variant="h6"
            sx={{ color: '#939393', textTransform: 'uppercase', mb: 4 }}
          >
            MY RESERVATIONS
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 3, sm: 6, md: 12 }}
          >
            {facilities.length ? (
              facilities.map(
                (
                  { facilityName, address, sportType, price, imageUrls, id },
                  index,
                ) => (
                  <Grid
                    item
                    key={index}
                    sx={{
                      mb: 2,
                    }}
                    xs={8}
                    sm={8}
                    md={6}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        width: '100%',
                        borderRadius: 2,
                      }}
                    >
                      <ImageCardsCarousel imageUrls={imageUrls} />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          Facility name: {facilityName}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          Address: {address}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                          Sport: {sportType.toUpperCase()}
                        </Typography>
                        <Typography
                          variant="h6"
                          color="text.secondary"
                          gutterBottom
                        >
                          {price} $ per hour
                        </Typography>
                        <Button
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            py: 1,
                            px: 3.5,
                            mr: 5,
                          }}
                          variant="outlined"
                          onClick={() => navigate(`/facility/${id}`)}
                        >
                          Edit
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ),
              )
            ) : (
              <Typography variant="h6" sx={{ color: '#121212', mt: 4, pl: 2 }}>
                You haven't created any reservation yet. Please make a
                reservation on some sport facility first.
              </Typography>
            )}
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
