import { Link } from '@reach/router';
import { Routes } from 'modules/routing';
import React from 'react';

export const Navigation: React.FC = () => (
  <nav>
    <ul>
      <li>
        <Link to={Routes.Landing}>Landing Page</Link>
      </li>
    </ul>
  </nav>
);
