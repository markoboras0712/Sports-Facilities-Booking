import { navigate } from '@reach/router';
import { authSelectors } from 'modules/authentication';
import { settingsSelector } from 'modules/authorization';
import { Routes } from 'modules/routing';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export const useDashboardRedirects = () => {
  const [loading, setLoading] = useState(true);
  const user = useRecoilValue(authSelectors.user);
  const settings = useRecoilValue(settingsSelector.settings);

  useEffect(() => {
    if (user?.userUid && !settings?.isOnboardingInProgress) {
      setLoading(false);
      navigate(Routes.AvailableObjects);
    }
    if (user?.userUid && settings?.isOnboardingInProgress) {
      setLoading(false);
      navigate(Routes.Onboarding);
    }

    if (user?.userUid === null) {
      setLoading(false);
      navigate(Routes.Login);
    }
  }, [user]);

  return { loading };
};
