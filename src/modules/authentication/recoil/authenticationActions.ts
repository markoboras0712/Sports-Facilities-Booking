import { navigate } from '@reach/router';
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, facebookProvider, googleProvider } from 'modules/firebase';
import { Routes } from 'modules/routing';
import { createNewUser } from './authenticationUtils';

export const signUpWithEmailPassword = async (
  email1: string,
  password: string,
) => {
  try {
    const response = await createUserWithEmailAndPassword(
      auth,
      email1,
      password,
    );
    const {
      email,
      metadata: { creationTime },
      uid,
    } = response.user;
    const newUserRef = doc(db, uid, 'settings');
    await setDoc(newUserRef, { email, creationTime });
    navigate(Routes.Onboarding);
  } catch (error) {
    console.log('SIGN-UP ERROR', { error });
    throw new Error('Didng signup');
  }
};

export const signInWithEmailPassword = async (
  email: string,
  password: string,
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);

    navigate(Routes.AvailableObjects);
  } catch (error) {
    alert(error);
    throw new Error('Didnt sign in');
  }
};

export const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    navigate(Routes.Login);
  } catch (error) {
    alert(error);
    throw new Error('didnt send password reset');
  }
};

export const signInWithGoogle = async () => {
  try {
    const { user } = await signInWithPopup(auth, googleProvider);
    await createNewUser(user);
  } catch (err) {
    alert(err);
    throw new Error('Didnt sign in');
  }
};

export const signInWithFacebook = async () => {
  try {
    const { user } = await signInWithPopup(auth, facebookProvider);
    await createNewUser(user);
  } catch (err) {
    alert(err);
    throw new Error('Didnt sign in');
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    navigate(Routes.Login);
  } catch (error) {
    throw new Error('didnt logout');
  }
};

// export const getUser = async (user: User) => {
//   try {
//     const docSnap = await getDoc(doc(db, 'users', user.uid));
//     // dispatch(fetchUsers(user.uid));
//     if (docSnap.exists()) {
//       const userFromFirestore = docSnap.data();
//       //   if (!!userFromFirestore.activeChats)
//       //     dispatch(fetchInboxUsers(userFromFirestore as AuthData));
//       //   navigate(Routes.Contacts);
//       return userFromFirestore;
//     }
//     const authUser = {
//       email: user.email,
//       id: user.uid,
//       photoUrl: user.photoURL,
//       activeChats: [],
//       displayName: user.displayName,
//     };
//     return authUser;
//   } catch (error) {
//     alert(error);
//     throw new Error('didnt get user data');
//   }
// };

// export const updateUserChats = async (uid: string, {}) => {
//   try {
//     // dispatch(fetchUsers(uid));
//     const docSnap = await getDoc(doc(db, 'users', uid));
//     if (docSnap.exists()) {
//       const userFromFirestore = docSnap.data();
//       return userFromFirestore.activeChats;
//     }
//   } catch (error) {
//     alert(error);
//     throw new Error('didnt get user data');
//   }
// };

// export const addUserToFirestore = async (user: AuthData) => {
//   try {
//     await setDoc(doc(db, 'users', user.id), user);
//   } catch (err) {
//     alert(err);
//     throw new Error('Didnt add user to firestore');
//   }
// };

// export const getFirestoreImageUrl = async (photoName: string, photo: File) => {
//   const storageRef = ref(storage);
//   const imagesRef = ref(storageRef, photoName);
//   await uploadBytes(imagesRef, photo);
//   const url = await getDownloadURL(imagesRef);
//   return url;
// };
