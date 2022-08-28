/* eslint-disable @typescript-eslint/no-unused-vars */
import { Container } from '@mui/material';
import { navigate } from '@reach/router';
import { facilityBuilderSteps } from 'const';
import { authSelectors } from 'modules/authentication';
import {
  OnboardingNavigation,
  OnboardingStepper,
  settingsSelector,
} from 'modules/authorization';
import { useFirestore } from 'modules/firebase';
import { Routes } from 'modules/routing';
import * as React from 'react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { useToast } from 'shared/hooks';
import { useFacilityBuilderSteps } from '../hooks';
import { Facility } from '../models';
import { FacilityAddress } from './FacilityAddress';
import { FacilityContact } from './FacilityContact';
import { FacilityInfo } from './FacilityInfo';
import { FacilityPreview } from './FacilityPreview';

export const FacilityBuilder: React.FC = () => {
  const user = useRecoilValue(authSelectors.user);
  const settings = useRecoilValue(settingsSelector.settings);
  const form = useForm<Facility>();
  const { updateFacility } = useFirestore();
  const { successToast } = useToast();
  const { handleSubmit, setValue } = form;

  const { activeStep, skipped, handleBack, handleNext, handleReset } =
    useFacilityBuilderSteps(handleSubmit, setValue);

  const onSubmit = handleSubmit((data: Facility) => {
    if (!user?.userUid || !settings?.country) return;

    const { files, ...restData } = data;

    const facilityData: Facility = {
      ...restData,
      creatorId: user?.userUid,
      createdAt: new Date(),
      country: data.country || settings.country,
    };

    updateFacility(user.userUid, facilityData.id, facilityData);
    successToast('Facility successfully created!');
    navigate(Routes.Landing);
  });

  useEffect(() => {
    if (settings) {
      // form.reset(settings);
      return;
    }
  }, [user]);

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
          {activeStep === facilityBuilderSteps.length && <FacilityPreview />}
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
