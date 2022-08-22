import { navigate, useLocation } from '@reach/router';
import { authSelectors } from 'modules/authentication';
import { settingsSelector } from 'modules/authorization';
import { Routes } from 'modules/routing';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

/**
 * Use Facilities Redirects Hook
 * @name useAuthenticationRedirects
 * @description Hook that is used to redirect to the auth page if the user is not authenticated.
 */

export const useFacilitiesRedirects = () => {
  const [loading, setLoading] = useState(true);
  const user = useRecoilValue(authSelectors.user);
  const settings = useRecoilValue(settingsSelector.settings);
  const { pathname } = useLocation();

  useEffect(() => {
    if (user?.userUid === null) {
      setLoading(false);
      navigate(Routes.Login);
    }

    if (user?.userUid && !settings?.isOnboardingInProgress) {
      setLoading(false);
      navigate(pathname);
    }

    if (user?.userUid && settings?.isOnboardingInProgress) {
      setLoading(false);
      navigate(Routes.Onboarding);
    }
  }, [user]);

  return { loading };
};
