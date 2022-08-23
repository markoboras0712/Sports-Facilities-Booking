import { Container } from '@mui/material';
import { facilityBuilderSteps } from 'const';
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
import { FacilityContact } from './FacilityContact';
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
          steps={facilityBuilderSteps}
        />
        <Container component="main" maxWidth="lg">
          {activeStep === 0 && <FacilityInfo />}
          {activeStep === 1 && <FacilityAddress />}
          {activeStep === 2 && <FacilityContact />}
          {activeStep === facilityBuilderSteps.length && (
            <OnboardingPreview avatarPhoto={settings?.avatar} />
          )}
        </Container>
        <OnboardingNavigation
          activeStep={activeStep}
          steps={facilityBuilderSteps}
          onSubmit={onSubmit}
          handleBack={handleBack}
          handleNext={handleNext}
          handleReset={handleReset}
        />
      </form>
    </FormProvider>
  );
};
