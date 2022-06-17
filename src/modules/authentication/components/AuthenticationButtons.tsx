import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Button } from '@mui/material';
import { useAuthentication } from 'modules/authentication';

interface Props {
  googleLogin?: boolean;
  facebookLogin?: boolean;
  title: string;
  authenticationHandler: (
    e?: React.BaseSyntheticEvent<object, any, any> | undefined,
  ) => Promise<void>;
}

export const AuthenticationButtons: React.FC<Props> = ({
  googleLogin,
  facebookLogin,
  title,
  authenticationHandler,
}) => {
  const { loginWithGoogle, loginWithFacebook } = useAuthentication();

  return (
    <>
      <Button
        onClick={authenticationHandler}
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
          onClick={() => loginWithGoogle()}
          sx={{ mt: 3, mb: 2 }}
        >
          <GoogleIcon />
        </Button>
      )}
      {facebookLogin && (
        <Button
          type="submit"
          fullWidth
          onClick={() => loginWithFacebook()}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          <FacebookIcon />
        </Button>
      )}
    </>
  );
};
