import * as React from 'react';
import { Box, Container, Grid, Paper } from '@mui/material';
import {
  Address,
  OnboardingNavigation,
  OnboardingStepper,
  PersonalData,
  UserInfo,
} from 'modules/authentication';
import { FormProvider, useForm } from 'react-hook-form';

export const Onboarding: React.FC = () => {
  const form = useForm<PersonalData>();
  const {
    getValues,
    formState: { errors },
  } = form;

  console.log(getValues(), { errors });

  const steps = ['PersonalData', 'Address'];
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    console.log('ode dalje');

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

  const onSubmit = (data: any) => console.log(data);

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
              <Container component="main" maxWidth="xs">
                {activeStep === 0 && <UserInfo />}
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
