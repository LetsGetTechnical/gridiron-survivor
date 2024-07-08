import React from 'react';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { toast } from 'react-hot-toast';
import { loginAccount } from './AuthHelper';
import { NextRouter } from 'next/router';

const mockGetUser = jest.fn();

jest.mock('./AuthHelper', () => ({
  loginAccount: jest.fn(),
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

  test('mock a successful login and show success notification', async () => {
    (loginAccount as jest.Mock).mockImplementation(async () => {
      toast.custom(
        <Alert variant={AlertVariants.Success} message="You've successfully logged in!" />,
      );
    });

    const pretendUser = {
        email: 'testemail@email.com',
        password: 'password1234',
    };

    const mockRouter = {
        push: jest.fn(),
    } as unknown as NextRouter;

    await loginAccount(pretendUser, mockRouter, mockGetUser);
    expect(loginAccount).toHaveBeenCalled();
    expect(toast.custom).toHaveBeenCalledWith(
      <Alert variant={AlertVariants.Success} message="You've successfully logged in!" />,
    );
  });

  test('mock a failed login and show error notification', async () => {
    (loginAccount as jest.Mock).mockImplementation(async () => {
        toast.custom(
            <Alert variant={AlertVariants.Error} message="Something went wrong!" />,
        );
    });

    const pretendUser = {
        email: 'testemail@email.com',
        password: 'password1234',
    };

    const mockRouter = {
        push: jest.fn(),
    } as unknown as NextRouter;

    try {
        await loginAccount(pretendUser, mockRouter, mockGetUser);
    } catch (error) {
        expect(toast.custom).toHaveBeenCalledWith(
            <Alert variant={AlertVariants.Error} message="Something went wrong!" />,
        );
    }
  });
});