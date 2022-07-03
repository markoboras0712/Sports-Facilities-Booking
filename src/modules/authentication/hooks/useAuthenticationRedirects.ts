import { navigate } from '@reach/router';
import { settingsSelector } from 'modules/authorization';
import { Routes } from 'modules/routing';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userSelectors } from '../store';

export const useAuthenticationRedirects = () => {
  const [loading, setLoading] = useState(true);
  const user = useRecoilValue(userSelectors.user);
  const settings = useRecoilValue(settingsSelector.settings);

  useEffect(() => {
    if (user?.userUid === null) {
      setLoading(false);
      navigate(Routes.Login);
    }

    if (user?.userUid && !settings?.isOnboardingInProgress) {
      setLoading(false);
      navigate(Routes.AvailableObjects);
    }

    if (user?.userUid && settings?.isOnboardingInProgress) {
      setLoading(false);
      navigate(Routes.Onboarding);
    }
  }, [user]);

  return { loading };
};
