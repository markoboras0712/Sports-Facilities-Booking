import { Router, RouteComponentProps } from '@reach/router';
import App from 'App';
import React from 'react';
import { Routes } from '../routes';

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps,
) => props.pageComponent;

export const Routing: React.FC = () => {
  return (
    <Router>
      <RouterPage path={Routes.Landing} pageComponent={<App />} />
    </Router>
  );
};
