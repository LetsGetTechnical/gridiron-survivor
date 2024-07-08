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
