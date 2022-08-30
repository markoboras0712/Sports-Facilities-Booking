import { navigate } from '@reach/router';
import { User } from 'firebase/auth';
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { OnboardingData } from 'modules/authorization';
import { Facility, myFacilities } from 'modules/facilities';
import { myReservations, Reservation } from 'modules/reservations';
import { Routes } from 'modules/routing';
import { useMemo } from 'react';
import { useSetRecoilState } from 'recoil';
import { removeEmptyProperties } from 'shared/utils';
import { createFirebaseApp } from '../initFirebase';
import { useFirestoreUtilities } from './useFirestoreUtilities';

export const useFirestore = () => {
  const db = useMemo(() => getFirestore(createFirebaseApp()), []);
  const setMyFacilities = useSetRecoilState(myFacilities);
  const setMyReservations = useSetRecoilState(myReservations);

  const {
    getCollectionSnapshot,
    collectionAlreadyExists,
    getDocumentReference,
    setUserCollection,
    isOnboardingData,
    setFacilityDocument,
    isFacilityData,
    isFacilityArrayData,
    isReservationArrayData,
  } = useFirestoreUtilities();

  //SETTINGS collection

  const createUserWithSocialMedia = async (user: User) => {
    const {
      email,
      metadata: { creationTime },
    } = user;
    const collectionSnapshot = await getCollectionSnapshot(user.uid);
    if (collectionAlreadyExists(collectionSnapshot)) {
      navigate(Routes.Landing);
      return;
    }
    try {
      const documentReference = getDocumentReference(user.uid, 'settings');
      await setUserCollection(documentReference, { email, creationTime });
      navigate(Routes.Onboarding);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUser = async (
    userUid: string,
    onboardingData: OnboardingData,
  ) => {
    try {
      const documentReference = getDocumentReference(userUid, 'settings');
      removeEmptyProperties(onboardingData);
      await setUserCollection(documentReference, onboardingData, true);
    } catch (error) {
      console.log(error);
    }
  };

  const getSettings = async (userUid: string) => {
    const settingsDocument = doc(db, userUid, 'settings');
    const settingsSnapshot = await getDoc(settingsDocument);
    const onboardingData = settingsSnapshot.data();

    if (isOnboardingData(onboardingData)) {
      return onboardingData;
    }

    return;
  };

  //FACILITIES collection

  const createFacility = async (
    userUid: string,
    facilityData: Omit<Facility, 'files'>,
  ) => {
    try {
      removeEmptyProperties(facilityData);
      const subColRef = collection(db, userUid, 'facilities', 'entities');
      const facilityRef = await addDoc(subColRef, facilityData);

      return facilityRef.id;
    } catch (error) {
      console.log(error);
    }

    return;
  };

  const updateFacility = async (
    userUid: string,
    facilityId: string,
    facilityData: Omit<Facility, 'files'>,
  ) => {
    try {
      const documentReference = doc(
        db,
        userUid,
        `facilities/entities/${facilityId}`,
      );
      removeEmptyProperties(facilityData);

      await setFacilityDocument(
        documentReference,
        { ...facilityData, id: facilityId },
        true,
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getFacility = async (userUid: string, facilityId: string) => {
    const facilityDocument = doc(
      db,
      userUid,
      `facilities/entities/${facilityId}`,
    );
    const facilitySnapshot = await getDoc(facilityDocument);
    const facilityData = facilitySnapshot.data();

    if (isFacilityData(facilityData)) return facilityData;

    return null;
  };

  const getMyFacilities = (userUid: string) => {
    try {
      const facilitiesRef = collection(db, userUid, 'facilities', 'entities');

      const q = query(facilitiesRef, orderBy('createdAt', 'asc'));
      const unsubscribe = onSnapshot(q, snapshot => {
        const facilities = snapshot.docs.map(doc => {
          return {
            ...doc.data(),
            startWorkingHour: doc.data().startWorkingHour.toDate(),
            endWorkingHour: doc.data().endWorkingHour.toDate(),
            createdAt: doc.data().createdAt.toDate(),
          };
        });

        isFacilityArrayData(facilities)
          ? setMyFacilities(facilities)
          : setMyFacilities([]);
      });
      return unsubscribe;
    } catch (error) {
      console.error(error);
    }
    return;
  };

  //RESERVATION collections

  const createReservation = async (
    userUid: string,
    reservationData: Omit<Reservation, 'id'>,
  ) => {
    try {
      removeEmptyProperties(reservationData);
      const reservationsSubColRef = collection(
        db,
        userUid,
        'reservations',
        'entities',
      );

      const reservationRef = await addDoc(
        reservationsSubColRef,
        reservationData,
      );

      const documentReference = doc(
        db,
        reservationData.creatorId,
        `facilities/entities/${reservationData.facilityId}`,
      );

      await updateDoc(documentReference, {
        reservedTimes: arrayUnion({
          ...reservationData,
          reservationId: reservationRef.id,
        }),
      });

      return reservationRef.id;
    } catch (error) {
      console.log(error);
    }

    return;
  };

  const deleteReservation = async (
    userUid: string,
    reservationData: Reservation,
  ) => {
    try {
      removeEmptyProperties(reservationData);
      const reservationDocRef = doc(
        db,
        userUid,
        'reservations',
        'entities',
        reservationData.id,
      );
      await deleteDoc(reservationDocRef);

      const documentReference = doc(
        db,
        reservationData.creatorId,
        `facilities/entities/${reservationData.facilityId}`,
      );
      const { id, ...restData } = reservationData;
      await updateDoc(documentReference, {
        reservedTimes: arrayRemove({
          ...restData,
          reservationId: id,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    return;
  };

  const getMyReservations = (userUid: string) => {
    try {
      const reservationsRef = collection(
        db,
        userUid,
        'reservations',
        'entities',
      );

      const q = query(reservationsRef, orderBy('createdAt', 'asc'));
      const unsubscribe = onSnapshot(q, snapshot => {
        const reservations = snapshot.docs.map(doc => {
          return {
            ...doc.data(),
            startTime: doc.data().startTime.toDate(),
            endTime: doc.data().endTime.toDate(),
            createdAt: doc.data().createdAt.toDate(),
            id: doc.id,
          };
        });

        isReservationArrayData(reservations)
          ? setMyReservations(reservations)
          : setMyReservations([]);
      });
      return unsubscribe;
    } catch (error) {
      console.error(error);
    }
    return;
  };

  return {
    getSettings,
    updateFacility,
    createUserWithSocialMedia,
    updateUser,
    createFacility,
    getFacility,
    getMyFacilities,
    createReservation,
    getMyReservations,
    deleteReservation,
  };
};
