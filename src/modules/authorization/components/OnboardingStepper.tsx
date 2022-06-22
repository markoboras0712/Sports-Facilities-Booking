import { Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

interface Props {
  activeStep: number;
  steps: string[];
  skipped: Set<number>;
}

export const OnboardingStepper: React.FC<Props> = ({
  activeStep,
  steps,
  skipped,
}) => {
  const isStepSkipped = (step: number) => skipped.has(step);

  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label, index) => {
        const stepProps: { completed?: boolean } = {};
        const labelProps: {
          optional?: React.ReactNode;
        } = {};
        if (isStepSkipped(index)) stepProps.completed = false;

        return (
          <Step key={label} {...stepProps}>
            <StepLabel {...labelProps}>{label}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};
