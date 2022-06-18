import { navigate } from '@reach/router';
import { User } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { OnboardingData } from 'modules/authorization';
import { db } from 'modules/firebase';
import { Routes } from 'modules/routing';

export const createNewUser = async (user: User) => {
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

export const updateUser = async (
  userUid: string,
  onboardingData: OnboardingData,
) => {
  const newUserRef = doc(db, userUid, 'settings');
  await setDoc(newUserRef, onboardingData, { merge: true });
  navigate(Routes.AvailableObjects);
};

export const getSettings = async (userUid: string) => {
  const settingsDocument = doc(db, userUid, 'settings');
  const settingsSnapshot = await getDoc(settingsDocument);
  return settingsSnapshot.data() as OnboardingData;
};
