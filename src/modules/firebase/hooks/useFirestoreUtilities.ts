import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDocs,
  QuerySnapshot,
  setDoc,
} from 'firebase/firestore';
import { OnboardingData } from 'modules/authorization';
import { db } from '../initFirebase';

export const useFirestoreUtilities = <T>() => {
  const getCollectionReference = (uid: string) => collection(db, uid);
  const getDocumentReference = (uid: string, documentName: string) =>
    doc(db, uid, documentName);
  const getCollectionSnapshot = (uid: string) => getDocs(collection(db, uid));

  const setUserCollection = async (
    documentReference: DocumentReference<DocumentData>,
    data: Omit<T, 'id'>,
    merge?: boolean,
  ) => {
    await setDoc(documentReference, data, { merge });
  };

  const collectionAlreadyExists = (
    collectionSnapshot: QuerySnapshot<DocumentData>,
  ) => !collectionSnapshot.empty;

  const isOnboardingData = (data?: DocumentData): data is OnboardingData => {
    return (data as OnboardingData).isOnboardingInProgress !== undefined;
  };

  return {
    getCollectionReference,
    getDocumentReference,
    setUserCollection,
    getCollectionSnapshot,
    collectionAlreadyExists,
    isOnboardingData,
  };
};
