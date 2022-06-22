import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import {
  OnboardingData,
  OnboardingStepper,
  UserInfo,
  Address,
  OnboardingPreview,
  OnboardingNavigation,
  settingsSelector,
} from 'modules/authorization';
import { steps } from 'const';
import { useRecoilValue } from 'recoil';
import { userSelectors } from 'modules/authentication';
import { useSteps } from '../hooks';
import { useFirestore } from 'modules/firebase';
import { navigate } from '@reach/router';
import { Routes } from 'modules/routing';

export const OnboardingBuilder: React.FC = () => {
  const user = useRecoilValue(userSelectors.user);
  const settings = useRecoilValue(settingsSelector.settings);
  const { updateUser } = useFirestore();
  const form = useForm<OnboardingData>();
  const { handleSubmit } = form;
  const { activeStep, skipped, handleBack, handleNext, handleReset } =
    useSteps(handleSubmit);

  const onSubmit = handleSubmit((data: OnboardingData) => {
    if (user?.userUid && settings) {
      updateUser(user.userUid, { ...data, isOnboardingInProgress: false });
      navigate(Routes.AvailableObjects);
    }
  });

  useEffect(() => {
    console.log({ settings }, { user });
    if (settings) {
      form.reset(settings);
      return;
    }
  }, [user]);

  return (
    <FormProvider {...form}>
      <form>
        <OnboardingStepper
          activeStep={activeStep}
          skipped={skipped}
          steps={steps}
        />
        <Container component="main" maxWidth="xl">
          {activeStep === 0 && <UserInfo avatarPhoto={settings?.avatar} />}
          {activeStep === 1 && <Address />}
          {activeStep === steps.length && (
            <OnboardingPreview avatarPhoto={settings?.avatar} />
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
