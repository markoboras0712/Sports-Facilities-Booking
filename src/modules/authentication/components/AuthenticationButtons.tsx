import * as React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Button } from '@mui/material';
import { Authentication, useAuthentication } from 'modules/authentication';
import { useForm } from 'react-hook-form';

interface Props {
  googleLogin?: boolean;
  facebookLogin?: boolean;
  title: string;
  onSubmit: (
    e?: React.BaseSyntheticEvent<object, unknown, unknown> | undefined,
  ) => Promise<void>;
}

export const AuthenticationButtons: React.FC<Props> = ({
  googleLogin,
  facebookLogin,
  title,
  onSubmit,
}) => {
  const { handleSubmit } = useForm<Authentication>();
  const { loginWithFacebook, loginWithGoogle } = useAuthentication();
  const googleHandler = handleSubmit(() => loginWithGoogle());
  const facebookHandler = handleSubmit(() => loginWithFacebook());

  return (
    <>
      <Button
        onClick={onSubmit}
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        {title}
      </Button>
      {googleLogin && (
        <Button
          type="submit"
          fullWidth
          variant="contained"
          onClick={googleHandler}
          sx={{ mt: 3, mb: 2 }}
        >
          <GoogleIcon />
        </Button>
      )}
      {facebookLogin && (
        <Button
          type="submit"
          fullWidth
          onClick={facebookHandler}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          <FacebookIcon />
        </Button>
      )}
    </>
  );
};
