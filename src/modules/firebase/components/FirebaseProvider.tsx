import { useAuthentication } from 'modules/authentication';
import * as React from 'react';
import { createFirebaseApp } from '../initFirebase';

interface Props {
  children: React.ReactNode;
}

export const FirebaseProvider: React.FC<Props> = ({ children }) => {
  createFirebaseApp();
  useAuthentication();
  // useFirestore();
  // const { loading } = useAuthRedirects();

  // if(loading) return <div>Loading...</div>;

  return <>{children}</>;
};
