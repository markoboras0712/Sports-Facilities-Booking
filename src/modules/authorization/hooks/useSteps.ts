import { userSelectors } from 'modules/authentication';
import { useFirestore } from 'modules/firebase';
import React from 'react';
import { UseFormHandleSubmit } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { OnboardingData } from '../models';
import { settingsAtoms } from '../store';

export const useSteps = (handleSubmit: UseFormHandleSubmit<OnboardingData>) => {
  const { updateUser } = useFirestore();
  const user = useRecoilValue(userSelectors.user);
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const setSettings = useSetRecoilState(settingsAtoms.settings);
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
