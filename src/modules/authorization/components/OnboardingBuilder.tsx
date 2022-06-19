import * as React from 'react';
import { Container } from '@mui/material';
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
  steps,
} from 'modules/authorization';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { updateUser, userAtoms } from 'modules/authentication';

export const OnboardingBuilder: React.FC = () => {
  const form = useForm<OnboardingData>();
  const {
    handleSubmit,
    formState: { errors },
    getValues,
  } = form;
  const userAvatar = React.useMemo<AvatarData>(() => getRandomOptions(), []);
  const user = useRecoilValue(userAtoms.user);
  const settings = useRecoilValue(settingsAtoms.settings);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const setSettings = useSetRecoilState(settingsAtoms.settings);

  const isStepSkipped = (step: number) => skipped.has(step);
  const handleNext = handleSubmit((data: OnboardingData) => {
    console.log('clicked', { errors }, getValues());

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
    const onboardingData: OnboardingData = { ...data, avatar: userAvatar };
    if (user?.userUid && settings) updateUser(user.userUid, onboardingData);
  });

  return (
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
  );
};
