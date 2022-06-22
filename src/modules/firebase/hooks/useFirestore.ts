import { navigate } from '@reach/router';
import { User } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { OnboardingData } from 'modules/authorization';
import { Routes } from 'modules/routing';
import { db } from '../store';
import { useFirestoreUtilities } from './useFirestoreUtilities';

export const useFirestore = () => {
  const {
    getCollectionSnapshot,
    collectionAlreadyExists,
    getDocumentReference,
    setUserCollection,
    isOnboardingData,
  } = useFirestoreUtilities();

  const createUserWithSocialMedia = async (user: User) => {
    const {
      email,
      metadata: { creationTime },
    } = user;
    const collectionSnapshot = await getCollectionSnapshot(user.uid);
    if (collectionAlreadyExists(collectionSnapshot)) {
      navigate(Routes.AvailableObjects);
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
      await setUserCollection(documentReference, onboardingData, true);
    } catch (error) {
      console.log(error);
    }
  };

  const getSettings = async (userUid: string) => {
    const settingsDocument = doc(db, userUid, 'settings');
    const settingsSnapshot = await getDoc(settingsDocument);
    if (isOnboardingData(settingsSnapshot.data() as OnboardingData)) {
      return settingsSnapshot.data() as OnboardingData;
    }
    return;
  };

  return {
    getSettings,
    createUserWithSocialMedia,
    updateUser,
  };
};
