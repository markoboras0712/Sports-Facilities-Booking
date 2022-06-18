import React from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { OnboardingData } from '../models';
import { settingsAtoms } from '../recoil';

export const useSteps = () => {
  const { handleSubmit } = useForm<OnboardingData>();
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());
  const setSettings = useSetRecoilState(settingsAtoms.userSettings);

  const isStepSkipped = (step: number) => skipped.has(step);
  const handleNext = handleSubmit((data: OnboardingData) => {
    setSettings(data);
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  });

  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleReset = () => setActiveStep(0);
  return { handleNext, handleBack, handleReset, activeStep, skipped };
};