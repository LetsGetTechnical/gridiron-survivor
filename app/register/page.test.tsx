import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from './page';

// Mock functions
const mockRegisterAccount = jest.fn();
const mockLoginAccount = jest.fn();
const mockPush = jest.fn();

let emailInput: HTMLElement;
let passwordInput: HTMLElement;
let confirmPasswordInput: HTMLElement;
let continueButton: HTMLElement;

const mockUseAuthContext = {
  registerAccount: mockRegisterAccount,
  loginAccount: mockLoginAccount,
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

    // Initialize user data
    const userData = {
      email: 'rt@example.com',
      password: 'rawr123',
      confirmPassword: 'rawr123',
    };

    // Mock resolved value for registerAccount
    mockRegisterAccount.mockResolvedValueOnce(userData);

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

  test('should call registerAccount function with email and password when continue button is clicked', async () => {
    fireEvent.change(emailInput, { target: { value: 'rt@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'rawr123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'rawr123' } });
    fireEvent.click(continueButton);

    await waitFor(() => {
      expect(mockRegisterAccount).toHaveBeenCalledWith({
        email: 'rt@example.com',
        password: 'rawr123',
        confirmPassword: 'rawr123',
      });
      expect(mockLoginAccount).toHaveBeenCalledWith({
        email: 'rt@example.com',
        password: 'rawr123',
      });
    });
  });

  test('redirects to /weeklyPicks when the button is clicked', async () => {
    mockUseAuthContext.isSignedIn = true;

    render(<Register />);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/weeklyPicks');
    });

    mockUseAuthContext.isSignedIn = false;
  });
});
