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
import { Facility } from 'modules/facilities';
import { Notification } from 'modules/notifications';
import { Reservation } from 'modules/reservations';
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

  const setDocument = async (
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

  const isFacilityData = (data?: DocumentData): data is Facility => {
    return data ? (data as Facility).facilityName !== undefined : false;
  };

  const isFacilityArrayData = (data?: DocumentData[]): data is Facility[] => {
    if (!data?.length) return false;
    return (data as Facility[])[0].facilityName !== undefined;
  };

  const isReservationArrayData = (
    data?: DocumentData[],
  ): data is Reservation[] => {
    if (!data?.length) return false;
    return (data as Reservation[])[0].facilityId !== undefined;
  };

  const isNotificationArrayData = (
    data?: DocumentData[],
  ): data is Notification[] => {
    if (!data?.length) return false;
    return (data as Notification[])[0].facilityId !== undefined;
  };

  return {
    getCollectionReference,
    getDocumentReference,
    setUserCollection,
    getCollectionSnapshot,
    setDocument,
    collectionAlreadyExists,
    isOnboardingData,
    isFacilityData,
    isFacilityArrayData,
    isReservationArrayData,
    isNotificationArrayData,
  };
};
