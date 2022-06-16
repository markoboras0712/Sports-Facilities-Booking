/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { Routing } from 'modules/routing';
import {
  signInWithEmailPassword,
  useAuthentication,
} from 'modules/authentication';

export const App: React.FC = () => {
  const { autoLogin } = useAuthentication();
  autoLogin();
  useEffect(() => {
    signInWithEmailPassword('mbora1s@gmail.com', '123456');
  }, []);
  return (
    <>
      <Routing />
    </>
  );
};
