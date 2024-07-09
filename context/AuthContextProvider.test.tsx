import React from 'react';
import { account } from '../api/config';
import Alert from '../components/AlertNotification/AlertNotification';
import { AlertVariants } from '../components/AlertNotification/Alerts.enum';
import { toast } from 'react-hot-toast';
import { loginAccount } from './AuthHelper';
import { NextRouter } from 'next/router';

const mockCreateEmailPasswordSession = jest.fn();
account.createEmailPasswordSession = mockCreateEmailPasswordSession;

jest.mock('../api/config');
jest.mock('next/router');
jest.mock('react-hot-toast', () => ({
  toast: {
    custom: jest.fn(),
  },
}));

describe('AuthContextProvider', () => {
  const user = {
    email: 'testemail@email.com',
    password: 'password1234',
  };

  const router = {
    push: jest.fn(),
  } as unknown as NextRouter;

  const getUser = jest.fn().mockResolvedValue({
    email: 'testemail@email.com',
    password: 'password1234',
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should show success notification after a successful login', async () => {

    mockCreateEmailPasswordSession.mockResolvedValue({});

    await loginAccount({user, router, getUser});

    expect(mockCreateEmailPasswordSession).toHaveBeenCalledWith(user.email, user.password);
    expect(getUser).toHaveBeenCalled();
    expect(router.push).toHaveBeenCalledWith('/league/all');
    expect(toast.custom).toHaveBeenCalledWith(
        <Alert variant={AlertVariants.Success} message="You've successfully logged in!" />,
    );
  });

  test('should show error notification after a login attempt errors', async () => {
    const mockError = new Error('Test error');

    mockCreateEmailPasswordSession.mockRejectedValue(mockError);

    const error = await loginAccount({user, router, getUser});

    expect(error).toEqual(mockError);
    expect(toast.custom).toHaveBeenCalledWith(
        <Alert variant={AlertVariants.Error} message="Something went wrong!" />,
    );
  });
});