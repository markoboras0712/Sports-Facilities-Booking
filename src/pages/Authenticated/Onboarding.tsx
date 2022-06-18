import * as React from 'react';
import { Box, Container, Grid, Paper } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import {
  AvatarData,
  OnboardingData,
  getRandomOptions,
  OnboardingStepper,
  UserInfo,
  Address,
  OnboardingPreview,
  OnboardingNavigation,
  settingsAtoms,
} from 'modules/authorization';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { updateUser, userAtoms } from 'modules/authentication';

export const Onboarding: React.FC = () => {
  const form = useForm<OnboardingData>();
  const { handleSubmit } = form;
  const steps = ['PersonalData', 'Address'];
  const userAvatar = React.useMemo<AvatarData>(() => getRandomOptions(), []);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const user = useRecoilValue(userAtoms.user);
  const settings = useRecoilValue(settingsAtoms.userSettings);
  const setSettings = useSetRecoilState(settingsAtoms.userSettings);

  const isStepSkipped = (step: number) => skipped.has(step);
  const handleNext = handleSubmit((data: OnboardingData) => {
    setSettings(data);
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  });

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => setActiveStep(0);

  const onSubmit = handleSubmit((data: OnboardingData) => {
    console.log('submit', { ...data, avatar: userAvatar });
    const onboardingData: OnboardingData = { ...data, avatar: userAvatar };
    setSettings(onboardingData);
    if (user?.userUid && settings) updateUser(user.userUid, settings);
  });

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
            marginTop: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <FormProvider {...form}>
            <form>
              <OnboardingStepper
                activeStep={activeStep}
                skipped={skipped}
                steps={steps}
              />
              <Container component="main" maxWidth="xl">
                {activeStep === 0 && <UserInfo avatarPhoto={userAvatar} />}
                {activeStep === 1 && <Address />}
                {activeStep === steps.length && (
                  <OnboardingPreview avatarPhoto={userAvatar} />
                )}
              </Container>
              <OnboardingNavigation
                activeStep={activeStep}
                steps={steps}
                onSubmit={onSubmit}
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
