import { RouteComponentProps, Router } from '@reach/router';
import {
  AvailableFacilitiesPage,
  ErrorPage,
  ForgotPasswordPage,
  LandingPage,
  LoginPage,
  OnboardingPage,
  SignUpPage,
} from 'pages';
import * as React from 'react';
import { Routes } from '../routes';

const RouterPage = (
  props: { pageComponent: JSX.Element } & RouteComponentProps,
) => props.pageComponent;

export const Routing: React.FC = () => {
  return (
    <Router basepath="/">
      <RouterPage path={Routes.Landing} pageComponent={<LandingPage />} />
      <RouterPage path={Routes.Login} pageComponent={<LoginPage />} />
      <RouterPage path={Routes.SignUp} pageComponent={<SignUpPage />} />
      <RouterPage
        path={Routes.ForgotPassword}
        pageComponent={<ForgotPasswordPage />}
      />
      <RouterPage
        path={Routes.AvailableObjects}
        pageComponent={<AvailableFacilitiesPage />}
      />
      <RouterPage path={Routes.Onboarding} pageComponent={<OnboardingPage />} />
      <RouterPage path={Routes.NotFound} pageComponent={<ErrorPage />} />
    </Router>
  );
};
