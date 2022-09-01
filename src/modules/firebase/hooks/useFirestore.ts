/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { OnboardingData, settingsSelector } from 'modules/authorization';
import { Facility, myFacilities, selectedFacility } from 'modules/facilities';
import { myReservations, Reservation } from 'modules/reservations';
import { myNotifications, Notification } from 'modules/notifications';
import { Routes } from 'modules/routing';
import { useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { removeEmptyProperties } from 'shared/utils';
import { createFirebaseApp } from '../initFirebase';
import { useFirestoreUtilities } from './useFirestoreUtilities';
import { Message, myMessages } from 'modules/messages';

export const useFirestore = () => {
  const db = useMemo(() => getFirestore(createFirebaseApp()), []);
  const setMyFacilities = useSetRecoilState(myFacilities);
  const setMyReservations = useSetRecoilState(myReservations);
  const setMyNotifications = useSetRecoilState(myNotifications);
  const setSelectedFacility = useSetRecoilState(selectedFacility);
  const setMyMessages = useSetRecoilState(myMessages);

  const settings = useRecoilValue(settingsSelector.settings);
  const facilities = useRecoilValue(myFacilities);

  const {
    getCollectionSnapshot,
    collectionAlreadyExists,
    getDocumentReference,
    setUserCollection,
    isOnboardingData,
    setDocument,
    isFacilityData,
    isFacilityArrayData,
    isReservationArrayData,
    isNotificationArrayData,
    isMessageArrayData,
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

  const deleteFacility = async (
    userUid: string,
    facilityData: Omit<Facility, 'files'>,
  ) => {
    try {
      removeEmptyProperties(facilityData);
      const facilityDocRef = doc(
        db,
        userUid,
        'facilities',
        'entities',
        facilityData.id,
      );

      await deleteDoc(facilityDocRef);
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

      await setDocument(
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
    const facilityData = {
      ...facilitySnapshot.data(),
      startWorkingHour: facilitySnapshot.data()?.startWorkingHour.toDate(),
      endWorkingHour: facilitySnapshot.data()?.endWorkingHour.toDate(),
      createdAt: facilitySnapshot.data()?.createdAt.toDate(),
    };

    if (isFacilityData(facilityData)) setSelectedFacility(facilityData);

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
    notificationId?: string,
  ) => {
    try {
      if (!notificationId) return;

      removeEmptyProperties(reservationData);
      const reservationsSubColRef = collection(
        db,
        userUid,
        'reservations',
        'entities',
      );

      const reservationRef = await addDoc(reservationsSubColRef, {
        ...reservationData,
        reservationCreatorId: userUid,
        notificationId,
      });

      const documentReference = doc(
        db,
        reservationData.creatorId,
        `facilities/entities/${reservationData.facilityId}`,
      );

      await updateDoc(documentReference, {
        reservedTimes: arrayUnion({
          ...reservationData,
          reservationCreatorId: userUid,
          reservationId: reservationRef.id,
          notificationId,
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
        reservationData.reservationId,
      );

      await deleteDoc(reservationDocRef);

      const documentReference = doc(
        db,
        reservationData.creatorId,
        `facilities/entities/${reservationData.facilityId}`,
      );

      await updateDoc(documentReference, {
        reservedTimes: arrayRemove(reservationData),
      });
    } catch (error) {
      console.log(error);
    }

    return;
  };

  const deleteReservationForFacility = async (
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
        reservationData.reservationId,
      );

      await deleteDoc(reservationDocRef);
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
            reservationId: doc.id,
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

  //NOTIFICATION COLLECTIONS

  const createNotification = async (
    userUid: string,
    reservationData: Omit<Reservation, 'id'>,
  ) => {
    try {
      if (!settings) return;

      const notificationData: Notification = {
        createdAt: new Date(),
        creatorId: userUid,
        creatorName: settings.firstName + ' ' + settings.lastName,
        startTime: reservationData.startTime,
        endTime: reservationData.endTime,
        facilityId: reservationData.facilityId,
        facilityName: reservationData.facilityName,
        avatar: settings.avatar,
        type: reservationData.type,
      };

      const notificationsSubColRef = collection(
        db,
        reservationData.creatorId,
        'notifications',
        'entities',
      );

      const notificationDoc = await addDoc(
        notificationsSubColRef,
        notificationData,
      );
      return notificationDoc.id;
    } catch (error) {
      console.log(error);
    }

    return;
  };

  const deleteNotification = async (
    reservationData: Reservation,
    notificationToDelete?: Notification | null,
  ) => {
    try {
      if (!reservationData.notificationId) return;
      removeEmptyProperties(reservationData);

      const receiverNotificationDocRef = doc(
        db,
        reservationData.creatorId,
        'notifications',
        'entities',
        reservationData.notificationId,
      );
      await deleteDoc(receiverNotificationDocRef);

      if (notificationToDelete?.id) {
        const senderNotificationDocRef = doc(
          db,
          reservationData.creatorId,
          'notifications',
          'entities',
          notificationToDelete.id,
        );
        await deleteDoc(senderNotificationDocRef);
      }
    } catch (error) {
      console.log(error);
    }

    return;
  };

  const getMyNotifications = (userUid: string) => {
    try {
      const notificationsRef = collection(
        db,
        userUid,
        'notifications',
        'entities',
      );

      const q = query(notificationsRef, orderBy('createdAt', 'asc'));
      const unsubscribe = onSnapshot(q, snapshot => {
        const notifications = snapshot.docs.map(doc => {
          return {
            ...doc.data(),
            startTime: doc.data().startTime.toDate(),
            endTime: doc.data().endTime.toDate(),
            createdAt: doc.data().createdAt.toDate(),
            id: doc.id,
          };
        });

        isNotificationArrayData(notifications)
          ? setMyNotifications(notifications)
          : setMyNotifications([]);
      });
      return unsubscribe;
    } catch (error) {
      console.error(error);
    }
    return;
  };

  const acceptReservation = async (
    userUid: string,
    notificationData: Notification,
  ) => {
    try {
      if (!notificationData.facilityId || !notificationData.id) return;
      removeEmptyProperties(notificationData);

      //update notification document
      const notificationDocumentReference = doc(
        db,
        userUid,
        `notifications/entities/${notificationData.id}`,
      );
      await setDocument(notificationDocumentReference, notificationData, true);

      //update facility document
      const selectedFacilityReservedTimes = facilities?.find(
        facility => facility.id === notificationData.facilityId,
      )?.reservedTimes;

      const selectedReservation = selectedFacilityReservedTimes?.find(
        reservation => reservation.facilityId === notificationData.facilityId,
      );

      const facilityDocumentReference = doc(
        db,
        userUid,
        `facilities/entities/${notificationData.facilityId}`,
      );

      await updateDoc(facilityDocumentReference, {
        reservedTimes: arrayRemove({
          ...selectedReservation,
        }),
      });
      await updateDoc(facilityDocumentReference, {
        reservedTimes: arrayUnion({
          ...selectedReservation,
          type: 'accepted',
        }),
      });

      //other user reservation document

      const reservationDocumentReference = doc(
        db,
        notificationData.creatorId,
        `reservations/entities/${selectedReservation?.reservationId}`,
      );
      await setDocument(
        reservationDocumentReference,
        {
          ...selectedReservation,
          type: 'accepted',
        },
        true,
      );
    } catch (error) {
      console.log(error);
    }

    return;
  };

  //messages collection

  async function createChat(notification: Notification, userUid: string) {
    try {
      console.log(notification);
      //create chat
      const chatRef = await addDoc(collection(db, 'messages'), {});
      await addDoc(collection(db, 'messages', chatRef.id, 'messages'), {});
      //update activeChat for both parties
      await updateDoc(doc(db, userUid, 'settings'), {
        activeChats: arrayUnion(chatRef.id),
      });
      await updateDoc(doc(db, notification.creatorId, 'settings'), {
        activeChats: arrayUnion(chatRef.id),
      });
      //send generic message to user who has reserved
      const messageSubCollectionRef = collection(
        db,
        'messages',
        chatRef.id,
        'messages',
      );
      await addDoc(messageSubCollectionRef, {
        createdAt: new Date(Date.now()),
        text: `Hello ${notification.creatorName}. You have successfully reserved ${notification.facilityName}. If you have any questions you can ask me here.`,
        uid: userUid,
        to: notification.creatorId,
      });
      //send notification to user who has reserved

      const notificationsSubColRef = collection(
        db,
        notification.creatorId,
        'notifications',
        'entities',
      );

      await addDoc(notificationsSubColRef, {
        ...notification,
        type: 'accepted',
      });
    } catch (error) {
      alert(error);
      throw new Error('didnt send message');
    }
  }

  //MESSAGES COLLECTION

  const getMessagesForChat = (chatId: string) => {
    try {
      const facilitiesRef = collection(db, 'messages', chatId, 'messages');

      const q = query(facilitiesRef, orderBy('createdAt', 'asc'));
      const unsubscribe = onSnapshot(q, snapshot => {
        const messages = snapshot.docs.map(doc => {
          return {
            ...doc.data(),
            createdAt: doc.data().createdAt.toDate(),
          };
        });

        isMessageArrayData(messages)
          ? setMyMessages(messages)
          : setMyMessages([]);
      });
      return unsubscribe;
    } catch (error) {
      console.error(error);
    }
    return;
  };

  const sendMessage = async (chatId: string, messageData: Message) => {
    try {
      removeEmptyProperties(messageData);

      const subCollectionRef = collection(db, 'messages', chatId, 'messages');
      await addDoc(subCollectionRef, messageData);
    } catch (error) {
      console.log(error);
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
    createNotification,
    deleteNotification,
    getMyNotifications,
    deleteFacility,
    acceptReservation,
    deleteReservationForFacility,
    createChat,
    getMessagesForChat,
    sendMessage,
  };
};
