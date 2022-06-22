import { settingsSelector } from 'modules/authorization';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userSelectors } from '../store';

export const useAuthenticationRedirects = () => {
  const settings = useRecoilValue(settingsSelector.settings);
  const user = useRecoilValue(userSelectors.user);
  const isLoggedIn = useRecoilValue(userSelectors.isLoggedIn);
  const [loading, setLoading] = useState(true);

  // console.log(!user);

  useEffect(() => {
    if (!user) setLoading(false);
    if (user) {
      // console.log('user postoji');
      // settings?.firstName && settings.address
      //   ? navigate(Routes.AvailableObjects)
      //   : navigate(Routes.Onboarding);
    }
  }, [user, settings]);

  console.log({ isLoggedIn, user, settings });

  return { loading };
};
