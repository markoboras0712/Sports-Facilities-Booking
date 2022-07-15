import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  enableIndexedDbPersistence,
  connectFirestoreEmulator,
} from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { connectStorageEmulator, getStorage } from 'firebase/storage';
import {
  connectAuthEmulator,
  FacebookAuthProvider,
  getAuth,
  GoogleAuthProvider,
} from 'firebase/auth';

export const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
});

export const functions = getFunctions(firebaseApp);
export const db = getFirestore(firebaseApp);
export const storage = getStorage(firebaseApp);
export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();
export const facebookProvider = new FacebookAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

if (location.hostname === 'localhost') {
  connectAuthEmulator(auth, 'http://localhost:9099');
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectStorageEmulator(storage, 'localhost', 9199);
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

enableIndexedDbPersistence(db, { forceOwnership: true }).catch(err => {
  if (err.code == 'failed-precondition') {
    console.log('error code', err);
  } else if (err.code == 'unimplemented') {
    console.log('error code', err);
  }
});
