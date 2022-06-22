import React from 'react';
import { useAuthentication } from '../hooks';

interface Props {
  children: React.ReactNode;
}

export const FirebaseAuthProvider: React.FC<Props> = ({ children }) => {
  useAuthentication();

  return <>{children}</>;
};
