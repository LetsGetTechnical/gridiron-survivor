import React from 'react';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { render, waitFor, screen } from '@testing-library/react';
import { toast } from 'react-hot-toast';
import {
  mockLogoutAuth,
  mockLogoutErrorAuth,
} from './__mocks__/AuthContextProvider';
import Login from '@/app/login/page';

const mockLoginAccount = jest.fn();

// jest.mock('./__mocks__/AuthContextProvider', () => ({
//   logoutAccount: jest.fn(),
// }));

jest.mock('react-hot-toast', () => ({
  toast: {
    custom: jest.fn(),
  },
}));

describe('AuthContextProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // test('mock a successful logout and show default notification', async () => {
  //   (logoutAccount as jest.Mock).mockImplementation(async () => {
  //     toast.custom(
  //       <Alert variant={AlertVariants.Default} message="Logged Out" />,
  //     );
  //   });

  //   await logoutAccount();
  //   expect(logoutAccount).toHaveBeenCalled();
  //   expect(toast.custom).toHaveBeenCalledWith(
  //     <Alert variant={AlertVariants.Default} message="Logged Out" />,
  //   );
  // });

  test('mock a successful logout and create default notification', async () => {
    await mockLogoutAuth();
    expect(toast.custom).toHaveBeenCalledWith(
      <Alert variant={AlertVariants.Default} message="Logged Out" />,
    );
  });

  test('mock an Error when logging out and create default notification', async () => {
    await mockLogoutErrorAuth();
    expect(toast.custom).toHaveBeenCalledWith(
      <Alert
        variant={AlertVariants.Error}
        message="Something went wrong. Try logging out again."
      />,
    );
  });

  test('mock an alert to show on the screen correctly', async () => {
    await mockLogoutAuth();
    render(<Login />);

    const alertElement = screen.getByTestId('alert-icon');

    await waitFor(() => {
      expect(alertElement).toBeInTheDocument();
    });
  });
});
