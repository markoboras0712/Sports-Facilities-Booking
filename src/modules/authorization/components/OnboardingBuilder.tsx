import { Container } from '@mui/material';
import { navigate } from '@reach/router';
import { steps } from 'const';
import { authSelectors } from 'modules/authentication';
import {
  Address,
  OnboardingData,
  OnboardingNavigation,
  OnboardingPreview,
  OnboardingStepper,
  settingsSelector,
  UserInfo,
} from 'modules/authorization';
import { useFirestore } from 'modules/firebase';
import { Routes } from 'modules/routing';
import { useEffect } from 'react';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useSteps } from '../hooks';
import { useToast } from 'shared/hooks';

export const OnboardingBuilder: React.FC = () => {
  const user = useRecoilValue(authSelectors.user);
  const settings = useRecoilValue(settingsSelector.settings);
  const setSettings = useSetRecoilState(settingsSelector.settings);
  const form = useForm<OnboardingData>();
  const { handleSubmit } = form;

  const { updateUser } = useFirestore();
  const { activeStep, skipped, handleBack, handleNext, handleReset } =
    useSteps(handleSubmit);
  const { successToast } = useToast();

  const onSubmit = handleSubmit((data: OnboardingData) => {
    if (user?.userUid && settings) {
      setSettings({ ...settings, isOnboardingInProgress: false });
      updateUser(user.userUid, { ...data, isOnboardingInProgress: false });
      successToast('Onboarding completed');
      navigate(Routes.AvailableObjects);
    }
  });

  useEffect(() => {
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
