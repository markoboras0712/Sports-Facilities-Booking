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
import { db } from '../store';

export const useFirestoreUtilities = <T>() => {
  const getCollectionReference = (uid: string) => collection(db, uid);
  const getDocumentReference = (uid: string, documentName: string) =>
    doc(db, uid, documentName);
  const getCollectionSnapshot = (uid: string) => getDocs(collection(db, uid));

  const writeToDocument = async (
    documentReference: DocumentReference<DocumentData>,
    data: Omit<T, 'id'>,
    merge?: boolean,
  ) => {
    await setDoc(documentReference, data, { merge });
  };

  const collectionAlreadyExists = (
    collectionSnapshot: QuerySnapshot<DocumentData>,
  ) => !collectionSnapshot.empty;

  const isOnboardingData = (data: OnboardingData): data is OnboardingData => {
    return (data as OnboardingData).firstName !== undefined;
  };

  return {
    getCollectionReference,
    getDocumentReference,
    writeToDocument,
    getCollectionSnapshot,
    collectionAlreadyExists,
    isOnboardingData,
  };
};
