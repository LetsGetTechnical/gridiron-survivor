// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';
import { account } from '@/api/config';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { toast } from 'react-hot-toast';
import { NextRouter } from 'next/router';
import { getCurrentUser } from '@/api/apiFunctions';
import { IUser } from '@/api/apiFunctions.interface';

type UserCredentials = {
  email: string;
  password: string;
};

/**
 * Authenticate and set session state
 * @param user.user
 * @param user.email
 * @param user.password
 * @param user - the user credentials
 * @param router - router function
 * @param getUser - getUser() function
 * @param user.router
 * @param user.getUser
 * @param getUser.user
 * @param getUser.router
 * @param getUser.getUser
 * @returns The error if there is one
 */
export const loginAccount = async ({
  user,
  router,
  getUser,
}: {
  user: UserCredentials;
  router: NextRouter;
  getUser: () => Promise<IUser | undefined>;
}): Promise<void | Error> => {
  try {
    await account.createEmailPasswordSession(user.email, user.password);
    await getUser(); // Fetch user data and update state
    router.push('/league/all');
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
 * Get user data from the session
 * @param router - router to navigate the page
 * @param updateUser - updateUser() function
 * @param resetUser - resetUser() function
 * @param setIsSignedIn - changes to false if errors
 * @returns {Promise<void>}
 */
export const getUser = async (
  router: NextRouter,
  updateUser: (id: string, email: string, leagues: any) => void,
  resetUser: () => void,
  setIsSignedIn: (value: boolean) => void,
) => {
  if (!isSessionInLocalStorage()) {
    router.push('/login');
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
