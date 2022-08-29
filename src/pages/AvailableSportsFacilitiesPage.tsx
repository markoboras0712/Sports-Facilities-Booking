import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Grid,
  IconButton,
  LinearProgress,
  Typography,
} from '@mui/material';
import { navigate } from '@reach/router';
import { authSelectors } from 'modules/authentication';
import { availableFacilities } from 'modules/facilities';
import { useFirebaseFunctions } from 'modules/firebase';
import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { ImageCardsCarousel, Navigation } from 'shared/components';

export const AvailableSportsFacilitiesPage: React.FC = () => {
  const [expandedId, setExpandedId] = useState(-1);
  const { getFacilities } = useFirebaseFunctions();
  const user = useRecoilValue(authSelectors.user);
  const facilities = useRecoilValue(availableFacilities);

  const handleExpandClick = (i: number) => {
    setExpandedId(expandedId === i ? -1 : i);
  };

  useEffect(() => {
    if (!user?.userUid) return;

    getFacilities();
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
            AVAILABLE SPORT FACILITIES FOR RESERVATION
          </Typography>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 3, sm: 6, md: 12 }}
          >
            {facilities.length ? (
              facilities.map(
                (
                  {
                    facilityName,
                    address,
                    sportType,
                    price,
                    imageUrls,
                    id,
                    startWorkingHour,
                    endWorkingHour,
                    capacity,
                    description,
                    city,
                    postalCode,
                    country,
                    phone,
                    email,
                    website,
                  },
                  index,
                ) => (
                  <Grid
                    item
                    key={id}
                    sx={{
                      mb: 2,
                    }}
                    xs={8}
                    sm={8}
                    md={6}
                  >
                    <Card
                      sx={{
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
                      </CardContent>
                      <CardActions disableSpacing>
                        <Button
                          sx={{
                            borderRadius: 2,
                            textTransform: 'none',
                            py: 1,
                            px: 3.5,
                            mb: 1,
                            mr: 5,
                          }}
                          variant="outlined"
                          onClick={() => navigate(`/facility/${id}`)}
                        >
                          Make a reservation
                        </Button>
                        <IconButton
                          onClick={() => handleExpandClick(index)}
                          aria-expanded={expandedId === index}
                          aria-label="show more"
                        >
                          <ExpandMoreIcon />
                        </IconButton>
                      </CardActions>
                      <Collapse
                        in={expandedId === index}
                        timeout="auto"
                        unmountOnExit
                      >
                        <CardContent>
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            gutterBottom
                          >
                            Description: {description}
                          </Typography>
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            gutterBottom
                          >
                            Start working hour:{' '}
                            {startWorkingHour?.toLocaleTimeString()}
                          </Typography>
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            gutterBottom
                          >
                            End working hour:{' '}
                            {endWorkingHour?.toLocaleTimeString()}
                          </Typography>
                          <Typography
                            variant="h6"
                            color="text.secondary"
                            gutterBottom
                          >
                            Capacity: {capacity}
                          </Typography>
                          {city && (
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              gutterBottom
                            >
                              City: {city}
                            </Typography>
                          )}
                          {postalCode && (
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              gutterBottom
                            >
                              ZIP: {postalCode}
                            </Typography>
                          )}
                          {country && (
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              gutterBottom
                            >
                              Country: {country}
                            </Typography>
                          )}
                          {phone && (
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              gutterBottom
                            >
                              Phone number: {phone}
                            </Typography>
                          )}
                          {email && (
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              gutterBottom
                            >
                              Email address: {email}
                            </Typography>
                          )}
                          {website && (
                            <Typography
                              variant="h6"
                              color="text.secondary"
                              gutterBottom
                            >
                              Website: {website}
                            </Typography>
                          )}
                        </CardContent>
                      </Collapse>
                    </Card>
                  </Grid>
                ),
              )
            ) : (
              <Typography variant="h6" sx={{ color: '#121212', mt: 4, pl: 2 }}>
                There isn't any available sport facility to reservate yet.
                Please check another time.
              </Typography>
            )}
          </Grid>
        </Box>
      </Grid>
    </>
  );
};
