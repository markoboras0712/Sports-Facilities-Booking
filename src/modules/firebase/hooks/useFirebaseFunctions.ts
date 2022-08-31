import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { authSelectors } from 'modules/authentication';
import { availableFacilities } from 'modules/facilities';
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

  //AVAILABLE FACILITIES

  const getFacilities = useCallback(async () => {
    if (!getAvailableFacilities || !user?.userUid) return;

    try {
      const availableFacilitiesData: GetAvailableFacilities = {
        userUid: user.userUid,
      };
      const { data } = await getAvailableFacilities(availableFacilitiesData);
      let total = 0;
      if (isStringArray(data)) {
        data.forEach(async data => {
          const querySnapshot = await getDocs(
            collection(db, data, 'facilities', 'entities'),
          );

          if (querySnapshot.size) total++;

          querySnapshot.forEach(doc => {
            const facilityData = {
              ...doc.data(),
              startWorkingHour: doc.data().startWorkingHour.toDate(),
              endWorkingHour: doc.data().endWorkingHour.toDate(),
              createdAt: doc.data().createdAt.toDate(),
            };

            if (isFacilityData(facilityData)) {
              setAvailableFacilities(currentState => {
                if (!currentState) return [facilityData];
                if (
                  currentState.find(facility => facility.id === facilityData.id)
                ) {
                  return currentState;
                }
                return [...currentState, facilityData];
              });
            }
          });
          if (total === 0) setAvailableFacilities([]);
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [getAvailableFacilities]);

  //AVAILABLE CHATS

  // const getChats = useCallback(async () => {
  //   if (!getAvailableFacilities || !user?.userUid) return;

  //   try {
  //     const availableFacilitiesData: GetAvailableFacilities = {
  //       userUid: user.userUid,
  //     };
  //     const { data } = await getAvailableFacilities(availableFacilitiesData);
  //     let total = 0;
  //     if (isStringArray(data)) {
  //       data.forEach(async data => {
  //         const querySnapshot = await getDocs(
  //           collection(db, data, 'facilities', 'entities'),
  //         );

  //         if (querySnapshot.size) total++;

  //         querySnapshot.forEach(doc => {
  //           const facilityData = {
  //             ...doc.data(),
  //             startWorkingHour: doc.data().startWorkingHour.toDate(),
  //             endWorkingHour: doc.data().endWorkingHour.toDate(),
  //             createdAt: doc.data().createdAt.toDate(),
  //           };

  //           if (isFacilityData(facilityData)) {
  //             setAvailableFacilities(currentState => {
  //               if (!currentState) return [facilityData];
  //               if (
  //                 currentState.find(facility => facility.id === facilityData.id)
  //               ) {
  //                 return currentState;
  //               }
  //               return [...currentState, facilityData];
  //             });
  //           }
  //         });
  //         if (total === 0) setAvailableFacilities([]);
  //       });
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [getAvailableFacilities]);

  return { getFacilities };
};
