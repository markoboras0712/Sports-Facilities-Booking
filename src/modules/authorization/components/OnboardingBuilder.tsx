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
} from 'modules/authorization';
import { steps } from 'const';
import { useRecoilValue } from 'recoil';
import { userSelectors } from 'modules/authentication';
import { useSteps } from '../hooks';
import { useFirestore } from 'modules/firebase';

export const OnboardingBuilder: React.FC = () => {
  const { updateUser } = useFirestore();
  const form = useForm<OnboardingData>();
  const { handleSubmit } = form;
  const { activeStep, skipped, handleBack, handleNext, handleReset } =
    useSteps(handleSubmit);
  const userAvatar = React.useMemo<AvatarData>(() => getRandomOptions(), []);
  const user = useRecoilValue(userSelectors.user);
  const settings = useRecoilValue(settingsAtoms.settings);

  const onSubmit = handleSubmit((data: OnboardingData) => {
    const onboardingData: OnboardingData = { ...data, avatar: userAvatar };
    if (user?.userUid && settings) {
      updateUser(user.userUid, onboardingData);
    }
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
