import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Grid,
  LinearProgress,
  styled,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { navigate } from '@reach/router';
import { authSelectors } from 'modules/authentication';
import { myFacilities } from 'modules/facilities';
import { useFirestore } from 'modules/firebase';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { ImageCardsCarousel, Navigation } from 'shared/components';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const AvailableSportsFacilitiesPage: React.FC = () => {
  const { getMyFacilities } = useFirestore();
  const user = useRecoilValue(authSelectors.user);
  const facilities = useRecoilValue(myFacilities);
  const [expanded, setExpanded] = React.useState(false);

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
                        <ExpandMore
                          expand={expanded}
                          onClick={() => setExpanded(!expanded)}
                          aria-expanded={expanded}
                          aria-label="show more"
                        >
                          <ExpandMoreIcon />
                        </ExpandMore>
                      </CardActions>
                      <Collapse in={expanded} timeout="auto" unmountOnExit>
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
