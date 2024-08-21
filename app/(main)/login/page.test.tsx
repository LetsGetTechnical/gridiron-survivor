import React, { Dispatch, useState as useStateMock } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login from './page';

const mockLogin = jest.fn();
const mockPush = jest.fn();
const getUser = jest.fn();
const setIsLoading = jest.fn();
const setState = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

let continueButton: HTMLElement,
  emailInput: HTMLInputElement,
  passwordInput: HTMLInputElement;

const mockUseAuthContext = {
  getUser,
  isSignedIn: false,
  login: mockLogin,
};

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: mockPush,
    };
  },
}));

jest.mock('../../../context/AuthContextProvider', () => ({
  useAuthContext() {
    return {
      ...mockUseAuthContext,
    };
  },
}));

describe('Login', () => {
  const setIsLoading = jest.fn();
  const useStateMock = (init: any): [unknown, Dispatch<unknown>] => [
    init,
    setState,
  ];
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

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

    waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  test('redirects to /weeklyPicks when the button is clicked', () => {
    mockUseAuthContext.isSignedIn = true;

    render(<Login />);
    expect(mockUseAuthContext.getUser).toHaveBeenCalled();

    mockUseAuthContext.isSignedIn = false;
  });

  test('redirects to /league/all when user navigates to /login', async () => {
    mockUseAuthContext.isSignedIn = true;

    render(<Login />);

    expect(mockPush).toHaveBeenCalledWith('/league/all');
  });
});

describe('Login loading spinner', () => {
  it('should show the loading spinner', async () => {
    (useStateMock as jest.Mock).mockImplementation((init: boolean) => [
      true,
      setIsLoading,
    ]);

    render(<Login />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument();
    });
  });
  it('should not show the loading spinner', async () => {
    (useStateMock as jest.Mock).mockImplementation((init: boolean) => [
      false,
      setIsLoading,
    ]);

    render(<Login />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
  });
});
