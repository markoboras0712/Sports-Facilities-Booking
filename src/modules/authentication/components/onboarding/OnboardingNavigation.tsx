import { Box, Button, Typography } from '@mui/material';
import React from 'react';

interface Props {
  steps: string[];
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleReset: () => void;
}

export const OnboardingNavigation: React.FC<Props> = ({
  steps,
  activeStep,
  handleBack,
  handleNext,
  handleReset,
}) => {
  return (
    <>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 20, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
            <Button>Submit</Button>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: '10%', mb: 1 }}>
            Step {activeStep + 1}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </>
  );
};
