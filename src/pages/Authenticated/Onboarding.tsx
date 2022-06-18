import * as React from 'react';
import { Box, Container, Grid, Paper } from '@mui/material';
import {
  Address,
  AvatarData,
  OnboardingNavigation,
  OnboardingStepper,
  OnboardingData,
  UserInfo,
} from 'modules/authentication';
import { FormProvider, useForm } from 'react-hook-form';
import { getRandomOptions } from 'modules/authentication/components/onboarding/getRandomOptions';

export const Onboarding: React.FC = () => {
  const form = useForm<OnboardingData>();
  const {
    getValues,
    handleSubmit,
    formState: { errors },
  } = form;
  console.log('error');
  const steps = ['PersonalData', 'Address'];
  const userAvatar = React.useMemo<AvatarData>(() => getRandomOptions(), []);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = handleSubmit((data: OnboardingData) => {
    console.log('ode dalje');
    console.log(getValues(), { errors }, data);

    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  });

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const onSubmit = (data: any) => {
    console.log('submit', data, userAvatar);
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
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <OnboardingStepper
                activeStep={activeStep}
                skipped={skipped}
                steps={steps}
              />
              <Container component="main" maxWidth="xl">
                {activeStep === 0 && <UserInfo avatarPhoto={userAvatar} />}
                {activeStep === 1 && <Address />}
              </Container>
              <OnboardingNavigation
                activeStep={activeStep}
                steps={steps}
                handleBack={handleBack}
                handleNext={handleNext}
                handleReset={handleReset}
              />
            </form>
          </FormProvider>
        </Box>
      </Grid>
    </Grid>
  );
};
