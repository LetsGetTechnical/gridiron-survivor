// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import React, { JSX } from 'react';
import { cache } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { account } from '@/api/config';
import { useRouter } from 'next/navigation';
import { useDataStore } from '@/store/dataStore';
import type { DataStore } from '@/store/dataStore';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { toast } from 'react-hot-toast';

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

/**
 * Provider for the authentication context.
 * @param children.children - The children to render.
 * @param children - The children to render.
 * @returns The rendered provider.
 */
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const { updateUser, resetUser, user } = useDataStore<DataStore>(
    (state) => state,
  );
  const router = useRouter();

  useEffect(() => {
    if (user.id === '' || user.email === '') {
      getUser();
      return;
    }

    setIsSignedIn(true);
  }, [user]);

  /**
   * Authenticate and set session state
   * @param user - The user credentials.
   * @returns The error if there is one.
   */
  const loginAccount = async (user: UserCredentials): Promise<void | Error> => {
    try {
      await account.createEmailPasswordSession(user.email, user.password);
      getUser();
      router.push('/weeklyPicks');
      toast.custom(
        <Alert
          variant={AlertVariants.Success}
          message="You've successfully logged in!"
        />,
      );
    } catch (error) {
      toast.custom(
        <Alert variant={AlertVariants.Error} message="Something went wrong!" />,
      );
      console.error('Login error:', error);
      return error as Error;
    }
  };

  /**
   * Log out and clear session state
   * @returns {Promise<void>}
   */
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

  /**
   * Get user data from the session
   * @returns {Promise<void>}
   */
  const getUser = cache(async () => {
    if (!isSessionInLocalStorage()) {
      return;
    }

    try {
      const userData = await account.get();
      updateUser(userData.$id, userData.email);
    } catch (error) {
      resetUser();
      setIsSignedIn(false);
      throw new Error('Error getting user data');
    }
  });

  /**
   * Helper function to validate session data in local storage
   * @returns {boolean} - Whether the session is in local storage.
   */
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

/**
 * Custom hook to access the authentication context
 * @returns The authentication context.
 */
const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      'useAuthContext must be used within an AuthContextProvider',
    );
  }
  return context;
};

export { useAuthContext };
