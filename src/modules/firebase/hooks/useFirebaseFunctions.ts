import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { authSelectors } from 'modules/authentication';
import { availableFacilities, Facility } from 'modules/facilities';
import { useCallback, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isStringArray } from 'shared/utils';
import { createFirebaseApp } from '../initFirebase';
import { useFirestoreUtilities } from './useFirestoreUtilities';

export const useFirebaseFunctions = () => {
  const functions = useMemo(
    () => getFunctions(createFirebaseApp(), 'europe-west2'),
    [],
  );
  const db = useMemo(() => getFirestore(createFirebaseApp()), []);
  const user = useRecoilValue(authSelectors.user);
  const { isFacilityData } = useFirestoreUtilities();
  const setAvailableFacilities = useSetRecoilState(availableFacilities);

  const getAvailableFacilities = httpsCallable(
    functions,
    'getAvailableFacilities',
  );

  const getFacilities = useCallback(async () => {
    if (!getAvailableFacilities || !user?.userUid) return;

    try {
      const availableFacilitiesData: GetAvailableFacilities = {
        userUid: user.userUid,
      };
      const { data } = await getAvailableFacilities(availableFacilitiesData);
      if (isStringArray(data)) {
        data.forEach(async data => {
          const querySnapshot = await getDocs(
            collection(db, data, 'facilities', 'entities'),
          );

          const availableFacilitiesData: Facility[] = [];

          querySnapshot.forEach(doc => {
            const facilityData = {
              ...doc.data(),
              startWorkingHour: doc.data().startWorkingHour.toDate(),
              endWorkingHour: doc.data().endWorkingHour.toDate(),
              createdAt: doc.data().createdAt.toDate(),
            };
            if (isFacilityData(facilityData))
              availableFacilitiesData.push(facilityData);
          });

          setAvailableFacilities(availableFacilitiesData);
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [getAvailableFacilities]);

  return { getFacilities };
};
