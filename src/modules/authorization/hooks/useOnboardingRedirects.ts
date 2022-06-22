import { userSelectors } from 'modules/authentication';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { settingsSelector } from '../store';

export const useOnboardingRedirects = () => {
  const settings = useRecoilValue(settingsSelector.settings);
  const user = useRecoilValue(userSelectors.user);

  useEffect(() => {
    console.log({ user, settings });
  }, [user]);
  // useEffect(() => {
  //   console.log({ settings, user });

  //   if (!user?.userUid) {
  //     console.log('nema usera');
  //     navigate(Routes.Login);
  //   }

  //   // if (settings && !settings.isOnboardingInProgress) {
  //   //   console.log('gotov onboarding');
  //   //   navigate(Routes.AvailableObjects);
  //   // }
  // }, [user, settings]);

  return Boolean(
    settings === undefined || (settings && !settings.isOnboardingInProgress),
  );
};
