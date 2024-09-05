// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import React, { JSX } from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { account } from '@/api/config';
import { useRouter } from 'next/navigation';
import { useDataStore } from '@/store/dataStore';
import type { DataStore } from '@/store/dataStore';
import { IUser } from '@/api/apiFunctions.interface';
import { getCurrentUser } from '@/api/apiFunctions';
import { loginAccount, logoutHandler } from './AuthHelper';
import { usePathname } from 'next/navigation';

type UserCredentials = {
  email: string;
  password: string;
};

type AuthContextType = {
  getUser: () => Promise<IUser | undefined>;
  login: (user: UserCredentials) => Promise<void | Error>; // eslint-disable-line no-unused-vars
  logoutAccount: () => Promise<void | Error>;
  isSignedIn: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);

/**
 * Provider for the authentication context.
 * @param children - The children to render.
 * @param children.children - The children to render.
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
  const pathname = usePathname();

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
   * @param router - Module for routing
   * @returns The error if there is one.
   */
  const login = async (user: UserCredentials): Promise<void | Error> => {
    try {
      await loginAccount({ user, router, getUser });
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  /**
   * Log out and clear session state
   * @returns {Promise<void | Error>} - The error if there is one.
   */
  const logoutAccount = async (): Promise<void | Error> => {
    await logoutHandler({ router, resetUser, setIsSignedIn });
  };

  /**
   * Get user data from the session
   * @returns {Promise<IUser | undefined>} - The user data or undefined if the user is not signed in
   */
  const getUser = async (): Promise<IUser | undefined> => {
    if (!isSessionInLocalStorage()) {
      if (pathname !== '/register') {
        router.push('/login');
      }
      return;
    }

    try {
      const user = await account.get();
      const userData: IUser = await getCurrentUser(user.$id);
      updateUser(userData.id, userData.email, userData.leagues);
      return userData;
    } catch (error) {
      resetUser();
      setIsSignedIn(false);
    }
  };

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
      getUser,
      isSignedIn,
      login,
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
