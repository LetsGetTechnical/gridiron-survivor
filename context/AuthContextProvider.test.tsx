import React from 'react';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { render } from '@testing-library/react';
import { toast } from 'react-hot-toast';
import { logoutAccount } from './__mocks__/AuthContextProvider';

const mockLoginAccount = jest.fn();

jest.mock('./__mocks__/AuthContextProvider', () => ({
  logoutAccount: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  toast: {
    custom: jest.fn(),
  },
}));

describe('AuthContextProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('mock a successful logout and show default notification', async () => {
    (logoutAccount as jest.Mock).mockImplementation(async () => {
      toast.custom(
        <Alert variant={AlertVariants.Default} message="Logged Out" />,
      );
    });

    await logoutAccount();
    expect(logoutAccount).toHaveBeenCalled();
    expect(toast.custom).toHaveBeenCalledWith(
      <Alert variant={AlertVariants.Default} message="Logged Out" />,
    );
  });
});
