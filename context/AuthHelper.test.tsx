import { account } from '../api/config';
import Alert from '../components/AlertNotification/AlertNotification';
import { AlertVariants } from '../components/AlertNotification/Alerts.enum';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { logoutHandler } from './AuthHelper';

import { toast } from 'react-hot-toast';

jest.mock('../api/config');
jest.mock('next/router');
jest.mock('react-hot-toast', () => ({
  toast: {
    custom: jest.fn(),
  },
}));

describe('LogoutHandler', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const router = {
    push: jest.fn(),
  } as unknown as AppRouterInstance;

  const resetUser = jest.fn();
  const setIsSignedIn = jest.fn();

  //logout tests
  test('after a successful logout it shows success notification', async () => {
    await logoutHandler({ resetUser, setIsSignedIn, router });

    expect(resetUser).toHaveBeenCalled();
    expect(router.push).toHaveBeenCalledWith('/login');
    expect(setIsSignedIn).toHaveBeenCalledWith(false);
    expect(toast.custom).toHaveBeenCalledWith(
      <Alert variant={AlertVariants.Success} message="Logged Out" />,
    );
  });

  test('after logout attempt errors it shows error notification', async () => {
    // Mock the `deleteSession` method to simulate an error
    account.deleteSession = jest.fn().mockRejectedValue('test error');

    // Call the `logoutHandler` with the necessary arguments
    await logoutHandler({ resetUser, setIsSignedIn, router });

    // Assert that the error notification is shown
    expect(toast.custom).toHaveBeenCalledWith(
      <Alert variant={AlertVariants.Error} message="Logout failed!" />,
    );
  });
});
