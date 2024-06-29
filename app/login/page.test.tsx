import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './page';

const mockLoginAccount = jest.fn();
const mockPush = jest.fn();
const mockCreateEmailPasswordSession = jest.fn();
const mockGetUser = jest.fn();

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
      createEmailPasswordSession: mockCreateEmailPasswordSession,
      getUser: mockGetUser,
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

  test('should successfully log in and show the success alert notification', async () => {
    fireEvent.change(emailInput, { target: { value: 'test@example.com'}});
    fireEvent.change(passwordInput, { target: { value: 'password123'}});
    fireEvent.click(continueButton);
  
    mockCreateEmailPasswordSession.mockResolvedValueOnce({});
  
    await waitFor(() => {
      expect(mockLoginAccount).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  
    await waitFor(() => {
      expect(mockCreateEmailPasswordSession).toHaveBeenCalledWith(
        'test@example.com',
        'password123',
    );
      expect(mockGetUser).toHaveBeenCalled();
      expect(mockPush).toHaveBeenCalledWith('/weeklyPicks');
    })
  });
});