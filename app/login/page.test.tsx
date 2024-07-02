import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './page';
import { account } from '@/api/config';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';

const mockLoginAccount = jest.fn();
const mockPush = jest.fn();

let emailInput: HTMLInputElement,
  passwordInput: HTMLInputElement,
  continueButton: HTMLElement;

const mockUseAuthContext = {
  loginAccount: mockLoginAccount,
  isSignedIn: false,
};

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: mockPush,
    };
  },
}));

jest.mock('../../context/AuthContextProvider', () => ({
  useAuthContext() {
    return {
      ...mockUseAuthContext,
    };
  },
}));

describe('Login', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(<Login />);
    emailInput = screen.getByTestId('email');
    passwordInput = screen.getByTestId('password');
    continueButton = screen.getByTestId('continue-button');
  });
  test('should render the login page', () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();
  });

  test('should update email state when input value changes', () => {
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');
  });

  test('should update password state when input value changes', () => {
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput).toHaveValue('password123');
  });

  test('should call loginAccount function with email and password when continue button is clicked', async () => {
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(continueButton);

    await waitFor(() => {
      expect(mockLoginAccount).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  test('redirects to /weeklyPicks when the button is clicked', () => {
    mockUseAuthContext.isSignedIn = true;

    render(<Login />);
    expect(mockPush).toHaveBeenCalledWith('/weeklyPicks');

    mockUseAuthContext.isSignedIn = false;
  });

  test('successfully logs in and shows success notification', async () => {
    const pretendUser = {
      email: 'testemail@email.com',
      password: 'test1234',
    }

    await mockLoginAccount(pretendUser);
    expect(account.createEmailPasswordSession).toBeInstanceOf(Object);

    render(<Alert variant={AlertVariants.Success} message="You've successfully logged in!" />)
  });

  test('shows error notification when logging in fails', async () => {
    const wrongUser = {
      email: 'testemil@emil.com',
      password: 'tst1234',
    };

    account.createEmailPasswordSession = jest.fn().mockRejectedValue({
      error: 'Error',
    });

    await mockLoginAccount(wrongUser);
    expect(account.createEmailPasswordSession).rejects.toEqual({
      error: 'Error',
    });

    render(<Alert variant={AlertVariants.Error} message="Something went wrong!" />);
  });
});