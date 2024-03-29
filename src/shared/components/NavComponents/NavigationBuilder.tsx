import { Box, Button, Typography } from '@mui/material';
import { useSubmitOnEnter, useToast } from 'shared/hooks';
import { useEffect } from 'react';
import * as React from 'react';
import { navigate } from '@reach/router';
import { Routes } from 'modules/routing';

interface Props {
  steps: string[];
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  handleReset: () => void;
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, unknown, unknown> | undefined,
  ) => Promise<void>;
}

export const NavigationBuilder: React.FC<Props> = ({
  steps,
  activeStep,
  handleBack,
  handleNext,
  handleReset,
  onSubmit,
}) => {
  const submitButtonRef = useSubmitOnEnter();
  const { infoToast } = useToast();

  const handleReturnBack = (e: React.MouseEvent) => {
    e.preventDefault();
    const shouldNavigate = window.confirm('Do you really want to go back?');

    if (!shouldNavigate) return;
    navigate(Routes.Landing);
  };

  useEffect(() => {
    if (activeStep === steps.length)
      infoToast(
        'You have successfully created sport facility! You can edit your facility before you finish.',
      );
  }, [activeStep]);

  return (
    <>
      {activeStep === steps.length ? (
        <>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Edit</Button>
            <Button ref={submitButtonRef} onClick={onSubmit}>
              Submit
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography sx={{ mt: 4, mb: 1 }}>Step {activeStep + 1}</Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              onClick={activeStep === 0 ? handleReturnBack : handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />

            <Button ref={submitButtonRef} onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </>
  );
};
