import { FirebaseOptions, getApp, getApps, initializeApp } from 'firebase/app';
import { enableIndexedDbPersistence, getFirestore } from 'firebase/firestore';

const clientCredentials: FirebaseOptions = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

/**
 * Initialization of Firebase
 * @name createFirebaseApp
 * @description Function that creates and initializes a firebase instance or retrieves the existing one.
 */

function createFirebaseApp() {
  if (!getApps().length) {
    const app = initializeApp(clientCredentials);

    return app;
  }

  return getApp();
}

export { createFirebaseApp };

/**
 * Enable IndexedDB persistence
 * @description Function that enables IndexedDB persistence for Firebase Firestore. This is used for offline capabilities.
 */

enableIndexedDbPersistence(getFirestore(createFirebaseApp()), {
  forceOwnership: true,
}).catch(err => {
  if (err.code == 'failed-precondition') {
    console.log('error code', err);
  } else if (err.code == 'unimplemented') {
    console.log('error code', err);
  }
});
