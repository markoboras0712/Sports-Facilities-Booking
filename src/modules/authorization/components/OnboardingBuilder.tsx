import { Container } from '@mui/material';
import { navigate } from '@reach/router';
import { onboardingSteps } from 'const';
import { authSelectors } from 'modules/authentication';
import {
  OnboardingAddress,
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
import { useOnboardingSteps } from '../hooks';
import { useToast } from 'shared/hooks';

export const OnboardingBuilder: React.FC = () => {
  const user = useRecoilValue(authSelectors.user);
  const settings = useRecoilValue(settingsSelector.settings);
  const setSettings = useSetRecoilState(settingsSelector.settings);
  const form = useForm<OnboardingData>();
  const { handleSubmit } = form;

  const { updateUser } = useFirestore();
  const { activeStep, skipped, handleBack, handleNext, handleReset } =
    useOnboardingSteps(handleSubmit);
  const { successToast } = useToast();

  const onSubmit = handleSubmit((data: OnboardingData) => {
    if (user?.userUid && settings) {
      setSettings({ ...settings, isOnboardingInProgress: false });
      updateUser(user.userUid, { ...data, isOnboardingInProgress: false });
      successToast('Onboarding completed');
      navigate(Routes.Landing);
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
          steps={onboardingSteps}
        />
        <Container component="main" maxWidth="xl">
          {activeStep === 0 && <UserInfo avatarPhoto={settings?.avatar} />}
          {activeStep === 1 && <OnboardingAddress />}
          {activeStep === onboardingSteps.length && (
            <OnboardingPreview avatarPhoto={settings?.avatar} />
          )}
        </Container>
        <OnboardingNavigation
          activeStep={activeStep}
          steps={onboardingSteps}
          onSubmit={onSubmit}
          handleBack={handleBack}
          handleNext={handleNext}
          handleReset={handleReset}
        />
      </form>
    </FormProvider>
  );
};
