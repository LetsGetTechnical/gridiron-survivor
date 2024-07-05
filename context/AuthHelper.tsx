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
 *
 * @param user
 * @param router
 * @param getUser
 */
export const loginAccount = async (
  user: UserCredentials,
  router: NextRouter,
  getUser: () => Promise<IUser | undefined>,
): Promise<void | Error> => {
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
 *
 * @param router
 * @param updateUser
 * @param resetUser
 * @param setIsSignedIn
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
 *
 */
const isSessionInLocalStorage = (): boolean => {
  const loadedDataString = localStorage.getItem('cookieFallback');

  if (!loadedDataString || loadedDataString === '[]') {
    localStorage.removeItem('cookieFallback');
    return false;
  }

  return true;
};
