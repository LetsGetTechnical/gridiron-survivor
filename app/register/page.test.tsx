import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from './page';
import { registerAccount } from '@/api/apiFunctions';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { toast } from 'react-hot-toast';

const mockLogin = jest.fn();
const mockPush = jest.fn();

jest.mock('../../api/apiFunctions', () => ({
  registerAccount: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  toast: {
    custom: jest.fn(),
  },
}));

let emailInput: HTMLElement;
let passwordInput: HTMLElement;
let confirmPasswordInput: HTMLElement;
let continueButton: HTMLElement;

const mockUseAuthContext = {
  login: mockLogin,
  isSignedIn: false,
};

// Mock the useRouter and useAuthContext hooks
jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: mockPush,
    };
  },
}));

jest.mock('../../context/AuthContextProvider', () => ({
  useAuthContext() {
    return mockUseAuthContext;
  },
}));

describe('Register', () => {
  beforeEach(() => {
    jest.clearAllMocks();

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
    fireEvent.click(continueButton);

    await waitFor(() => {
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
    fireEvent.change(emailInput, { target: { value: 'test@test.com' }});
    fireEvent.change(passwordInput, { target: { value: 'pw1234' }});
    fireEvent.change(confirmPasswordInput, { target: { value: 'pw1234' }});
    fireEvent.click(continueButton);

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
      expect(mockPush).toHaveBeenCalledWith('/league/all');
      expect(toast.custom).toHaveBeenCalledWith(
        <Alert
          variant={AlertVariants.Success}
          message="You have successfully registered your account."
        />,
      );
    });
  });

  test('should show error notification upon submission failing', async () => {
    mockLogin.mockImplementationOnce(() => Promise.reject(new Error('Mock error')));

    fireEvent.change(emailInput, { target: { value: 'test@test.com' }});
    fireEvent.change(passwordInput, { target: { value: 'pw1234' }});
    fireEvent.change(confirmPasswordInput, { target: { value: 'pw1234' }});
    fireEvent.click(continueButton);

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
          variant={AlertVariants.Error}
          message="Something went wrong!"
        />,
      );
    });
  });
});
