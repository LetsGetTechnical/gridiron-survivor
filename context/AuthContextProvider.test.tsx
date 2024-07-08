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
jest.mock('react-hot-toast');

describe('AuthContextProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('after a successful login it shows success notification', async () => {
    const mockUser = {
        email: 'testemail@email.com',
        password: 'password1234',
    };

    const mockRouter = {
        push: jest.fn(),
    } as unknown as NextRouter;

    const mockGetUser = jest.fn().mockResolvedValue({
        email: 'testemail@email.com',
        password: 'password1234',
    });

    mockCreateEmailPasswordSession.mockResolvedValue({});
    toast.custom = jest.fn();

    await loginAccount(mockUser, mockRouter, mockGetUser);

    expect(mockCreateEmailPasswordSession).toHaveBeenCalledWith(mockUser.email, mockUser.password);
    expect(mockGetUser).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith('/league/all');
    expect(toast.custom).toHaveBeenCalledWith(
        <Alert variant={AlertVariants.Success} message="You've successfully logged in!" />,
    );
  });

  test('after login attempt errors it shows error notification', async () => {
    const mockUser = {
        email: 'testemail@email.com',
        password: 'password1234',
    };

    const mockRouter = {
        push: jest.fn(),
    } as unknown as NextRouter;

    const mockGetUser = jest.fn().mockResolvedValue({
        email: 'testemail@email.com',
        password: 'password1234',
    });

    const mockError = new Error('Test error');

    mockCreateEmailPasswordSession.mockRejectedValue(mockError);
    toast.custom = jest.fn();

    const error = await loginAccount(mockUser, mockRouter, mockGetUser);

    expect(error).toEqual(mockError);
    expect(toast.custom).toHaveBeenCalledWith(
        <Alert variant={AlertVariants.Error} message="Something went wrong!" />,
    );
  });
});