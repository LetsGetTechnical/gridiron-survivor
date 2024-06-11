import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from './page';

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

describe('Register', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(<Register />);

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
    fireEvent.change(emailInput, { target: { value: 'test01@example.com' } });
    expect(emailInput).toHaveValue('test01@example.com');
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
    fireEvent.change(emailInput, { target: { value: 'test01@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'password123' },
    });
    fireEvent.click(continueButton);
    console.log('continue button clicked');

    await waitFor(async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 0)); // Allow microtask queue to flush
        expect(mockRegisterAccount).toHaveBeenCalledWith({
          confirmPassword: 'password123',
          email: 'test01@example.com',
          password: 'password123',
        });
        expect(mockLoginAccount).toHaveBeenCalledWith({
          email: 'test01@example.com',
          password: 'password123',
        });
      } catch (error) {
        console.error(error);
        throw error; // Rethrow error to fail the test
      }
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