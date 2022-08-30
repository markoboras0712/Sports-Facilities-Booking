import { RouteComponentProps, Router } from '@reach/router';
import {
  AvailableSportsFacilitiesPage,
  EditFacilityPage,
  ErrorPage,
  ForgotPasswordPage,
  HostFacilityPage,
  LandingPage,
  LoginPage,
  MyReservationsPage,
  MySportsFacilitiesPage,
  OnboardingPage,
  ProfilePage,
  RegisterPage,
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
      <RouterPage path={Routes.Register} pageComponent={<RegisterPage />} />
      <RouterPage
        path={Routes.ForgotPassword}
        pageComponent={<ForgotPasswordPage />}
      />
      <RouterPage path={Routes.Onboarding} pageComponent={<OnboardingPage />} />
      <RouterPage path={Routes.Profile} pageComponent={<ProfilePage />} />
      <RouterPage
        path={Routes.FacilityBuilder}
        pageComponent={<HostFacilityPage />}
      />
      <RouterPage
        path={Routes.MySportFacilities}
        pageComponent={<MySportsFacilitiesPage />}
      />
      <RouterPage
        path={Routes.EditFacility}
        pageComponent={<EditFacilityPage />}
      />
      <RouterPage
        path={Routes.AvailableFacilities}
        pageComponent={<AvailableSportsFacilitiesPage />}
      />
      <RouterPage
        path={Routes.MyReservations}
        pageComponent={<MyReservationsPage />}
      />
      <RouterPage path={Routes.NotFound} pageComponent={<ErrorPage />} />
    </Router>
  );
};
