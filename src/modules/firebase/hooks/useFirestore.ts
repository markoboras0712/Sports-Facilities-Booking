import { navigate } from '@reach/router';
import { User } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
} from 'firebase/firestore';
import { OnboardingData } from 'modules/authorization';
import { Facility } from 'modules/facilities';
import { Routes } from 'modules/routing';
import { useMemo } from 'react';
import { removeEmptyProperties } from 'shared/utils';
import { createFirebaseApp } from '../initFirebase';
import { useFirestoreUtilities } from './useFirestoreUtilities';

export const useFirestore = () => {
  const db = useMemo(() => getFirestore(createFirebaseApp()), []);

  const {
    getCollectionSnapshot,
    collectionAlreadyExists,
    getDocumentReference,
    setUserCollection,
    isOnboardingData,
    setFacilityDocument,
    isFacilityData,
  } = useFirestoreUtilities();

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

    if (isFacilityData(facilityData)) {
      return facilityData;
    }

    return;
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

  return {
    getSettings,
    updateFacility,
    createUserWithSocialMedia,
    updateUser,
    createFacility,
    getFacility,
  };
};
