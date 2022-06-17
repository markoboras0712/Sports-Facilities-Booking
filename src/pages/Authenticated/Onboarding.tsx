/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { Box, Container, Grid, Paper } from '@mui/material';
import {
  Address,
  OnboardingNavigation,
  OnboardingStepper,
  // PersonalData,
  UserInfo,
} from 'modules/authentication';

export const Onboarding: React.FC = () => {
  const steps = ['PersonalData', 'Address'];
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const [firstName, setFirstName] = React.useState('');

  // const [userInfoData, setUserInfoData] = React.useState<PersonalData>(); // the lifted state
  // console.log(userInfoData);
  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  // const sendDataToParent = (data: PersonalData) => {
  //   setUserInfoData(data);
  // };

  const handleNext = () => {
    console.log('handleNext', firstName);
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        item
        xs={12}
        sm={10}
        md={12}
        component={Paper}
      >
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <OnboardingStepper
            activeStep={activeStep}
            skipped={skipped}
            steps={steps}
          />
          <Container component="main" maxWidth="xs">
            {activeStep === 0 && <UserInfo {...{ firstName, setFirstName }} />}
            {activeStep === 1 && <Address />}
          </Container>
          <OnboardingNavigation
            activeStep={activeStep}
            steps={steps}
            handleBack={handleBack}
            handleNext={handleNext}
            handleReset={handleReset}
          />
        </Box>
      </Grid>
    </Grid>
  );
};
