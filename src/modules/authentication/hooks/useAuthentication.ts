import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../recoil';

export const useAuthentication = () => {
  // const dispatch = useDispatch();

  // const loginWithGoogle = () => {
  //   dispatch(signInWithGoogle());
  // };

  // const loginWithEmailPassword = (data: Login) => {
  //   dispatch(signInWithEmailPassword(data));
  // };

  // const resetPassword = (email: string) => {
  //   dispatch(sendPasswordReset(email));
  //   navigate(Routes.Login);
  // };

  // const registerWithEmailPassword = (data: Register) => {
  //   dispatch(signUpWithEmailPassword(data));
  // };

  // const logoutUser = () => {
  //   dispatch(logout());
  //   dispatch(clearUser());
  //   navigate(Routes.Login);
  // };

  const autoLogin = () => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log({ user });
      }
      if (!user) {
        console.log('no user');
      }
      return unsubscribe;
    });
  };

  return {
    autoLogin,
  };
};
