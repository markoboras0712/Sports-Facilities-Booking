import { authSelectors } from 'modules/authentication';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useFirebaseFunctions } from './useFirebaseFunctions';
import { useFirestore } from './useFirestore';

export const useFirestoreListeners = () => {
  const user = useRecoilValue(authSelectors.user);
  const { getMyNotifications, getMyFacilities, getMyReservations } =
    useFirestore();
  const { getFacilities } = useFirebaseFunctions();

  useEffect(() => {
    if (!user?.userUid) return;

    getMyNotifications(user.userUid);
    getMyReservations(user.userUid);
    getMyFacilities(user.userUid);
    getFacilities();
  }, [user]);
};
