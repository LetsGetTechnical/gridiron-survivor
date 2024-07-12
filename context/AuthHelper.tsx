// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';
import { account } from '@/api/config';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { toast } from 'react-hot-toast';
import { NextRouter } from 'next/router';
import { IUser } from '@/api/apiFunctions.interface';

type UserCredentials = {
  email: string;
  password: string;
};

/**
 * Authenticate and set session state
 * @param props - User, router, and getUser()
 * @param props.user - the user credentials
 * @param props.router - router function
 * @param props.getUser - getUser() function
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
 * Log out and clear session state
 * @returns {Promise<void | Error>}
 */
export const logoutAccount = async ({
  resetUser,
  setIsSignedIn,
  router,
}: {
  resetUser: () => void;
  setIsSignedIn: (bool: false) => void;
  router: NextRouter;
}): Promise<void | Error> => {
  try {
    await account.deleteSession('current');
    setIsSignedIn(false);
    resetUser(); // Reset user data in the store
    toast.custom(
      <Alert variant={AlertVariants.Success} message="Logged Out" />,
    );
    router.push('/login');
  } catch (error) {
    toast.custom(
      <Alert variant={AlertVariants.Error} message="Logout failed!" />,
    );
    console.error('Logout error:', error);
    return error as Error;
  }
};
