// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';
import { account } from '@/api/config';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { toast } from 'react-hot-toast';
import { IUser } from '@/api/apiFunctions.interface';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

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
  router: AppRouterInstance;
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
