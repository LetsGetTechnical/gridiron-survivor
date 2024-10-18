import { act } from 'react-dom/test-utils';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { registerAccount } from '@/api/apiFunctions';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { toast } from 'react-hot-toast';
import Alert from '@/components/AlertNotification/AlertNotification';
import React, { useState as useStateMock } from 'react';
import Register from './page';

const mockLogin = jest.fn();
const mockPush = jest.fn();
const setIsLoading = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

jest.mock('@/api/apiFunctions', () => ({
  registerAccount: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  toast: {
    custom: jest.fn(),
  },
}));

let confirmPasswordInput: HTMLElement,
  continueButton: HTMLElement,
  emailInput: HTMLElement,
  passwordInput: HTMLElement;

const mockUseAuthContext = {
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
    return mockUseAuthContext;
  },
}));

describe('Register', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(React, 'useState')
      .mockImplementation(() => [false, setIsLoading]);

    render(<RegisterPage />);

    confirmPasswordInput = screen.getByTestId('confirm-password');
    continueButton = screen.getByTestId('continue-button');
    emailInput = screen.getByTestId('email');
    passwordInput = screen.getByTestId('password');
  });

  it('should render the register page', () => {
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  it('should update email, password, and confirm password fields and submit form', async () => {
    const form = screen.getByTestId('register-form');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'rt@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'rawr1234' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'rawr1234' } });
    });

    await act(async () => {
      fireEvent.submit(form);
    });

    await waitFor(() => {
      expect(registerAccount).toHaveBeenCalledTimes(1);
      expect(registerAccount).toHaveBeenCalledWith({
        email: 'rt@example.com',
        password: 'rawr1234',
        confirmPassword: 'rawr1234',
      });
    });
  });

  it('redirects to /league/all when the button is clicked', async () => {
    mockUseAuthContext.isSignedIn = true;

    render(<RegisterPage />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/league/all');
    });

    mockUseAuthContext.isSignedIn = false;
  });

  it('should show success notification upon successful submission', async () => {
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
    fireEvent.change(passwordInput, { target: { value: 'pw123456' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'pw123456' } });
    fireEvent.submit(continueButton);

    await waitFor(() => {
      expect(registerAccount).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'pw123456',
        confirmPassword: 'pw123456',
      });
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'pw123456',
        confirmPassword: 'pw123456',
      });
      expect(toast.custom).toHaveBeenCalledWith(
        <Alert
          variant={AlertVariants.Success}
          message="You have successfully registered your account."
        />,
      );
    });
  });

  it('should show error notification upon submission failing', async () => {
    const form = screen.getByTestId('register-form');

    (registerAccount as jest.Mock).mockRejectedValueOnce(
      new Error('Mock error'),
    );
    mockLogin.mockRejectedValueOnce(new Error('Mock error'));

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'pw123456' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'pw123456' } });
    });

    await act(async () => {
      fireEvent.submit(form);
    });

    await waitFor(() => {
      expect(registerAccount).toHaveBeenCalledWith({
        email: 'test@test.com',
        password: 'pw123456',
        confirmPassword: 'pw123456',
      });
      expect(mockLogin).not.toHaveBeenCalled();
      expect(toast.custom).toHaveBeenCalledWith(
        <Alert variant={AlertVariants.Error} message="Something went wrong!" />,
      );
    });
  });
  it('renders Register component in dark mode using global css styles for background and foreground', () => {
    const darkModeSection = screen.getByTestId('dark-mode-section');

    expect(darkModeSection).toHaveClass('bg-gradient-to-b');
  });
});

describe('Register loading spinner', () => {
  it('should show the loading spinner', async () => {
    (useStateMock as jest.Mock).mockImplementation((init: boolean) => [
      true,
      setIsLoading,
    ]);

    render(<Register />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).toBeInTheDocument();
    });
  });
  it('should not show the loading spinner', async () => {
    (useStateMock as jest.Mock).mockImplementation((init: boolean) => [
      false,
      setIsLoading,
    ]);

    render(<Register />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
    });
  });
});
