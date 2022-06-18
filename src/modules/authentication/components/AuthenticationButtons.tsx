import React from 'react';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Button } from '@mui/material';
import { Authentication, useAuthentication } from 'modules/authentication';
import { useForm } from 'react-hook-form';
import { useLocation } from '@reach/router';
import { Routes } from 'modules/routing';

interface Props {
  googleLogin?: boolean;
  facebookLogin?: boolean;
  title: string;
}

export const AuthenticationButtons: React.FC<Props> = ({
  googleLogin,
  facebookLogin,
  title,
}) => {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<Authentication>();
  const { pathname } = useLocation();
  const {
    loginWithFacebook,
    loginWithEmailPassword,
    registerWithEmailPassword,
    loginWithGoogle,
  } = useAuthentication();

  const onSubmit = handleSubmit((data) => {
    if (errors.email || errors.password) return;
    const { email, password } = data;
    pathname === Routes.Login
      ? loginWithEmailPassword(email, password)
      : registerWithEmailPassword(email, password);
    console.log('Succes', email, password);
  });

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
