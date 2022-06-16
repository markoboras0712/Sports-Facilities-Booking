/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from './firebase';

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
    console.log({ response });

    const { email, metadata, uid } = response.user;
    console.log({ email, metadata, uid });

    // dispatch(
    //   addUserToFirestore({
    //     displayName: `${firstName} ${lastName}`,
    //     email,
    //     id: response.user.uid,
    //     activeChats: [],
    //     photoUrl: photoUrl as string,
    //   }),
    // );
  } catch (error) {
    alert(error);
    throw new Error('Didng signup');
  }
};

export const signInWithEmailPassword = async (
  email: string,
  password: string,
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert(error);
    throw new Error('Didnt sign in');
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

// export const signInWithGoogle = async () => {
//   try {
//     const { user } = await signInWithPopup(auth, provider);
//     const q = query(collection(db, 'users'), where('id', '==', user.uid));
//     const querySnapshot = await getDocs(q);
//     const authUser: AuthData = {
//       email: user.email,
//       id: user.uid,
//       photoUrl: user.photoURL,
//       activeChats: [],
//       displayName: user.displayName,
//     };
//     if (!querySnapshot.docs.length) {
//       //   dispatch(addUserToFirestore(authUser));
//     }
//   } catch (err) {
//     alert(err);
//     throw new Error('Didnt sign in');
//   }
// };

// export const logout = async () => {
//   try {
//     await signOut(auth);
//   } catch (error) {
//     throw new Error('didnt logout');
//   }
// };

// export const sendPasswordReset = async (email: string) => {
//   try {
//     await sendPasswordResetEmail(auth, email);
//   } catch (error) {
//     alert(error);
//     throw new Error('didnt send password reset');
//   }
// };

// export const getFirestoreImageUrl = async (photoName: string, photo: File) => {
//   const storageRef = ref(storage);
//   const imagesRef = ref(storageRef, photoName);
//   await uploadBytes(imagesRef, photo);
//   const url = await getDownloadURL(imagesRef);
//   return url;
// };
