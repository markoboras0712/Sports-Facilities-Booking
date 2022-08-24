import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDocs,
  getFirestore,
  QuerySnapshot,
  setDoc,
} from 'firebase/firestore';
import { OnboardingData } from 'modules/authorization';
import { useMemo } from 'react';
import { createFirebaseApp } from '../initFirebase';

export const useFirestoreUtilities = <T>() => {
  const db = useMemo(() => getFirestore(createFirebaseApp()), []);

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

  const setFacilityDocument = async (
    documentReference: DocumentReference<DocumentData>,
    data: T,
    merge?: boolean,
  ) => {
    await setDoc(documentReference, data, { merge });
  };

  const collectionAlreadyExists = (
    collectionSnapshot: QuerySnapshot<DocumentData>,
  ) => !collectionSnapshot.empty;

  const isOnboardingData = (data?: DocumentData): data is OnboardingData => {
    return data
      ? (data as OnboardingData).isOnboardingInProgress !== undefined
      : false;
  };

  return {
    getCollectionReference,
    getDocumentReference,
    setUserCollection,
    getCollectionSnapshot,
    setFacilityDocument,
    collectionAlreadyExists,
    isOnboardingData,
  };
};
