import React from 'react';
import { Routing } from 'modules/routing';
import { useAuthentication } from 'modules/authentication';

export const App: React.FC = () => {
  const { autoLogin } = useAuthentication();
  autoLogin();

  return (
    <>
      <Routing />
    </>
  );
};
