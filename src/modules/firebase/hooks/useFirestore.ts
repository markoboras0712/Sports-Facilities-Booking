import { navigate } from '@reach/router';
import { User } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { OnboardingData } from 'modules/authorization';
import { Routes } from 'modules/routing';
import { db } from '../store';

export const useFirestore = () => {
  const createNewUser = async (user: User) => {
    const {
      email,
      metadata: { creationTime },
    } = user;
    const collectionSnapshot = await getDocs(collection(db, user.uid));

    if (!collectionSnapshot.empty) {
      navigate(Routes.AvailableObjects);
      return;
    }
    const newUserRef = doc(db, user.uid, 'settings');
    await setDoc(newUserRef, { email, creationTime });
    navigate(Routes.Onboarding);
  };

  const updateUser = async (
    userUid: string,
    onboardingData: OnboardingData,
  ) => {
    const newUserRef = doc(db, userUid, 'settings');
    await setDoc(newUserRef, onboardingData, { merge: true });
    navigate(Routes.AvailableObjects);
  };

  const isOnboardingData = (data: OnboardingData): data is OnboardingData => {
    return (data as OnboardingData).firstName !== undefined;
  };

  const getSettings = async (userUid: string) => {
    const settingsDocument = doc(db, userUid, 'settings');
    const settingsSnapshot = await getDoc(settingsDocument);
    if (isOnboardingData(settingsSnapshot.data() as OnboardingData)) {
      return settingsSnapshot.data() as OnboardingData;
    }
    return;
  };

  return { createNewUser, updateUser, getSettings };
};
