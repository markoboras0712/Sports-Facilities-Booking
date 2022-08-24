/* eslint-disable @typescript-eslint/no-unused-vars */
import { authSelectors } from 'modules/authentication';
import { settingsSelector } from 'modules/authorization';
import { useFirestore } from 'modules/firebase';
import { useState } from 'react';
import { useForm, UseFormHandleSubmit } from 'react-hook-form';
import { useRecoilValue } from 'recoil';
import { Facility } from '../models';

export const useFacilityBuilderSteps = (
  handleSubmit: UseFormHandleSubmit<Facility>,
) => {
  const [activeStep, setActiveStep] = useState(0);
  const { getValues, setValue } = useForm<Facility>();

  const [skipped, setSkipped] = useState(new Set<number>());
  const user = useRecoilValue(authSelectors.user);
  const settings = useRecoilValue(settingsSelector.settings);

  // const setSettings = useSetRecoilState(settingsSelector.settings);

  const { createFacility, updateFacility } = useFirestore();
  const isStepSkipped = (step: number) => skipped.has(step);

  const handleNext = handleSubmit(async (data: Facility) => {
    if (!user?.userUid || !settings?.country) return;
    const { files, ...restData } = data;
    const facilityData: Facility = {
      ...restData,
      creatorId: user?.userUid,
      createdAt: new Date(),
      country: data.country || settings.country,
    };
    // setSettings(data);

    let newSkipped = skipped;

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);

    if (activeStep === 0) {
      const facilityId = await createFacility(user.userUid, facilityData);
      if (facilityId) setValue('id', facilityId);
    }

    if (activeStep !== 0)
      updateFacility(user.userUid, getValues().id, facilityData);

    setSkipped(newSkipped);
  });

  const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);
  const handleReset = () => setActiveStep(0);

  return { handleNext, handleBack, handleReset, activeStep, skipped };
};
