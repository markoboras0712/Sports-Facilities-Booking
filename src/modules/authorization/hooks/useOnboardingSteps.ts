import { authSelectors } from 'modules/authentication';
import { useFirestore } from 'modules/firebase';
import { useState } from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { OnboardingData } from '../models';
import { settingsSelector } from '../store';

export const useOnboardingSteps = (
  handleSubmit: UseFormHandleSubmit<OnboardingData>,
) => {
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const user = useRecoilValue(authSelectors.user);
  const setSettings = useSetRecoilState(settingsSelector.settings);

  const { updateUser } = useFirestore();
  const isStepSkipped = (step: number) => skipped.has(step);

  const handleNext = handleSubmit((data: OnboardingData) => {
    setSettings(data);

    let newSkipped = skipped;

    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);

    if (user?.userUid) updateUser(user.userUid, data);

    setSkipped(newSkipped);
  });

  const handleBack = () => setActiveStep(prevActiveStep => prevActiveStep - 1);
  const handleReset = () => setActiveStep(0);

  return { handleNext, handleBack, handleReset, activeStep, skipped };
};
