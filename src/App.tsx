import React from 'react';
import { Routing } from 'modules/routing';
import { FirebaseAuthProvider } from 'modules/authentication/components/FirebaseAuthProvider';

export const App: React.FC = () => {
  return (
    <>
      <FirebaseAuthProvider>
        <Routing />
      </FirebaseAuthProvider>
    </>
  );
};
