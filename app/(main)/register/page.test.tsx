import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import React, { Dispatch, useState as useStateMock } from 'react';
import Register from './page';
import { registerAccount } from '@/api/apiFunctions';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { toast } from 'react-hot-toast';

const mockLogin = jest.fn();
const mockPush = jest.fn();
const setIsLoading = jest.fn();
const setState = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}));

jest.mock('@/api/apiFunctions', () => ({
  registerAccount: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  toast: {
    custom: jest.fn(),
  },
}));

let confirmPasswordInput: HTMLElement;
let continueButton: HTMLElement;
let emailInput: HTMLElement;
let passwordInput: HTMLElement;

const mockUseAuthContext = {
  isSignedIn: false,
  login: mockLogin,
};

// Mock the useRouter and useAuthContext hooks
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: mockPush,
    };
  },
}));

jest.mock('../../../context/AuthContextProvider', () => ({
  useAuthContext() {
    return mockUseAuthContext;
  },
}));

describe('Register', () => {
  const setIsLoading = jest.fn();
  const useStateMock = (init: any): [unknown, Dispatch<unknown>] => [init, setState];
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(React, 'useState').mockImplementation(useStateMock);

    render(<Register />);

    // Get form elements
    emailInput = screen.getByTestId('email');
    passwordInput = screen.getByTestId('password');
    confirmPasswordInput = screen.getByTestId('confirm-password');
    continueButton = screen.getByTestId('continue-button');
  });

  test('should render the register page', () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();
  });

  test('should update email state when input value changes', () => {
    fireEvent.change(emailInput, { target: { value: 'rt@example.com' } });
    expect(emailInput).toHaveValue('rt@example.com');
  });

  test('should update password state when input value changes', () => {
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    expect(passwordInput).toHaveValue('password123');
  });

  test('should update confirmPassword state when input value changes', () => {
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    });
    expect(confirmPasswordInput).toHaveValue('password123');
  });

  test('should mock registerAccount function with email and password when continue button is clicked', async () => {
    fireEvent.change(emailInput, { target: { value: 'rt@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'rawr123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'rawr123' } });
    fireEvent.submit(continueButton);

    await waitFor(() => {
      expect(registerAccount).toHaveBeenCalledTimes(1);
      expect(registerAccount).toHaveBeenCalledWith({
        email: 'rt@example.com',
        password: 'rawr123',
        confirmPassword: 'rawr123',
      });
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'rt@example.com',
        password: 'rawr123',
        confirmPassword: 'rawr123',
      });
    });
  });

  test('redirects to /league/all when the button is clicked', async () => {
    mockUseAuthContext.isSignedIn = true;

    render(<Register />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/league/all');
    });

    mockUseAuthContext.isSignedIn = false;
  });

  test('should show success notification upon successful submission', async () => {
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'pw1234' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'pw1234' } });
    fireEvent.submit(continueButton);

    await waitFor(() => {
      expect(registerAccount).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'pw1234',
        confirmPassword: 'pw1234',
      });
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'pw1234',
        confirmPassword: 'pw1234',
      });
      expect(toast.custom).toHaveBeenCalledWith(
        <Alert
          variant={AlertVariants.Success}
          message="You have successfully registered your account."
        />,
      );
    });
  });

  test('should show error notification upon submission failing', async () => {
    mockLogin.mockImplementationOnce(() =>
      Promise.reject(new Error('Mock error')),
    );

    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'pw1234' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'pw1234' } });
    fireEvent.submit(continueButton);

    await waitFor(() => {
      expect(registerAccount).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'pw1234',
        confirmPassword: 'pw1234',
      });
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'pw1234',
        confirmPassword: 'pw1234',
      });
      expect(toast.custom).toHaveBeenCalledWith(
        <Alert variant={AlertVariants.Error} message="Something went wrong!" />,
      );
    });
  });
  test('renders Register component in dark mode using global css styles for background and foreground', () => {
    const darkModeSection = screen.getByTestId('dark-mode-section');

    expect(darkModeSection).toHaveClass('bg-gradient-to-b');
  });
});

describe('Register loading spinner', () => {
  it('should show the loading spinner', async () => {
    (useStateMock as jest.Mock).mockImplementation((init: boolean) => [true, setIsLoading]);

    render(<Register />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument();
    });
  });
  it('should not show the loading spinner', async () => {
    (useStateMock as jest.Mock).mockImplementation((init: boolean) => [false, setIsLoading]);

    render(<Register />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
  });
});
