import { act } from 'react-dom/test-utils';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import Login from './page';
import React, { useState as useStateMock } from 'react';

const getUser = jest.fn();
const mockLogin = jest.fn();
const mockPush = jest.fn();
const setIsLoading = jest.fn();

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
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(React, 'useState')
      .mockImplementation(() => [false, setIsLoading]);

    render(<Login />);

    continueButton = screen.getByTestId('continue-button');
    emailInput = screen.getByTestId('email');
    passwordInput = screen.getByTestId('password');
  });
  it('should render the login page', () => {
    expect(continueButton).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('should update email and password fields and submit form', async () => {
    const form = screen.getByTestId('login-form');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
    });

    await act(async () => {
      fireEvent.submit(form);
    });

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledTimes(1);
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('redirects to /weeklyPicks when the button is clicked', () => {
    mockUseAuthContext.isSignedIn = true;

    render(<Login />);
    expect(mockUseAuthContext.getUser).toHaveBeenCalled();

    mockUseAuthContext.isSignedIn = false;
  });

  it('redirects to /league/all when user navigates to /login', async () => {
    mockUseAuthContext.isSignedIn = true;

    act(() => {
      render(<Login />);
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/league/all');
    });

    mockUseAuthContext.isSignedIn = false;
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
