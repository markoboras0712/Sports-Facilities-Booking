import { Link } from '@reach/router';
import { Routes } from 'modules/routing';
import React from 'react';
import classes from './MainNavigation.module.css';

export const Navigation: React.FC = () => (
  <nav>
    <ul className={classes.header__ul}>
      <li className={classes.header__li}>
        <Link to={Routes.Landing} className={classes.header__a}>
          Landing Page
        </Link>
      </li>
    </ul>
  </nav>
);
