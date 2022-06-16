import React from 'react';
import classes from './Layout.module.css';
import { MainNavigation } from './MainNavigation';

export const Layout: React.FC = () => {
  return (
    <div>
      <MainNavigation />
      <main className={classes.main}>CHILDREN</main>
    </div>
  );
};
