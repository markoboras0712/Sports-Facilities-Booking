import React from 'react';
import { MainNavigation } from './MainNavigation';

export const Layout: React.FC = () => {
  return (
    <div>
      <MainNavigation />
      <main>CHILDREN</main>
    </div>
  );
};
