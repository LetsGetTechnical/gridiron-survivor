// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { account } from '@/api/config';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

/**
 *
 * @param user
 */
export const loginAccount = async (
  user: UserCredentials,
): Promise<void | Error> => {
  const router = useRouter();
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
