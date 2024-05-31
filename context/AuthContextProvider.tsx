'use client';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { account } from '@/api/config';
import { useRouter } from 'next/navigation';
import { useDataStore } from '@/store/dataStore';
import type { DataStore } from '@/store/dataStore';
import { IUser } from '@/api/IapiFunctions';

type UserCredentials = {
  email: string;
  password: string;
};

type AuthContextType = {
  isSignedIn: boolean;
  setIsSignedIn: (isSignedIn: boolean) => void;
  loginAccount: (user: UserCredentials) => Promise<void | Error>;
  logoutAccount: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const { updateUser, resetUser, user } = useDataStore<DataStore>(
    (state) => state,
  );
  const router = useRouter();

  useEffect(() => {
    if (user.id === '' || user.email === '') {
      // getUser();
      return;
    }

    setIsSignedIn(true);
  }, [user]);

  // Authenticate and set session state
  const loginAccount = async (user: UserCredentials): Promise<void | Error> => {
    try {
      const session = await account.createEmailPasswordSession(
        user.email,
        user.password,
      );
      getUser(session.userId);
      router.push('/weeklyPicks');
    } catch (error) {
      console.error('Login error:', error);
      return error as Error;
    }
  };

  // Log out and clear session state
  const logoutAccount = async (): Promise<void> => {
    try {
      await account.deleteSession('current');
      setIsSignedIn(false);
      resetUser(); // Reset user data in the store
      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // get user
  const getUser = async (userId: IUser['id']) => {
    if (!isSessionInLocalStorage()) {
      return;
    }

    console.log(userId);

    try {
      // TODO: Update User Data Fetch from User Document
      const userData = await account.get();
      updateUser(userData.$id, userData.email);
    } catch (error) {
      resetUser();
      setIsSignedIn(false);
      throw new Error('Error getting user data');
    }
  };

  // Helper function to validate session data in local storage
  const isSessionInLocalStorage = (): boolean => {
    const loadedDataString = localStorage.getItem('cookieFallback');

    if (!loadedDataString || loadedDataString === '[]') {
      localStorage.removeItem('cookieFallback');
      return false;
    }

    return true;
  };

  // Memoize context values to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      isSignedIn,
      setIsSignedIn,
      loginAccount,
      logoutAccount,
    }),
    [isSignedIn],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// Custom hook to access the authentication context
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider',
    );
  }
  return context;
}
