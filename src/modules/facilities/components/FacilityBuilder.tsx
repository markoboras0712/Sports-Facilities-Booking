import { Container } from '@mui/material';
import { onboardingSteps } from 'const';
import { authSelectors } from 'modules/authentication';
import {
  OnboardingNavigation,
  OnboardingPreview,
  OnboardingStepper,
  settingsSelector,
} from 'modules/authorization';
import * as React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { useFacilityBuilderSteps } from '../hooks';
import { Facility } from '../models';
import { FacilityAddress } from './FacilityAddress';
import { FacilityInfo } from './FacilityInfo';

export const FacilityBuilder: React.FC = () => {
  const user = useRecoilValue(authSelectors.user);
  const settings = useRecoilValue(settingsSelector.settings);
  const form = useForm<Facility>();
  const { handleSubmit } = form;
  console.log({ user, settings });

  const { activeStep, skipped, handleBack, handleNext, handleReset } =
    useFacilityBuilderSteps(handleSubmit);

  const onSubmit = handleSubmit((data: Facility) => {
    console.log(data);
  });

  //   useEffect(() => {
  //     if (settings) {
  //       form.reset(settings);
  //       return;
  //     }
  //   }, [user]);

  return (
    <FormProvider {...form}>
      <form>
        <OnboardingStepper
          activeStep={activeStep}
          skipped={skipped}
          steps={onboardingSteps}
        />
        <Container component="main" maxWidth="xl">
          {activeStep === 0 && <FacilityInfo />}
          {activeStep === 1 && <FacilityAddress />}
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
