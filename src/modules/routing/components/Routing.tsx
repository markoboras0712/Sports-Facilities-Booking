import { Router, RouteComponentProps } from '@reach/router';
import { ForgotPassword } from 'pages/Public/ForgotPassword';
import { Login } from 'pages/Public/Login';
import { SignUp } from 'pages/Public/SignUp';
import React from 'react';
import { Routes } from '../routes';

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps,
) => props.pageComponent;

export const Routing: React.FC = () => {
  return (
    <Router basepath="/">
      <RouterPage path={Routes.Login} pageComponent={<Login />} />
      <RouterPage path={Routes.SignUp} pageComponent={<SignUp />} />
      <RouterPage
        path={Routes.ForgotPassword}
        pageComponent={<ForgotPassword />}
      />
    </Router>
  );
};
