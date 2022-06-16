import { Router, RouteComponentProps } from '@reach/router';
import { Login } from 'pages/Login';
import { SignUp } from 'pages/SignUp';
import React from 'react';
import { Routes } from '../routes';

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps,
) => props.pageComponent;

export const Routing: React.FC = () => {
  return (
    <Router>
      <RouterPage path={Routes.Login} pageComponent={<Login />} />
      <RouterPage path={Routes.SignUp} pageComponent={<SignUp />} />
    </Router>
  );
};
