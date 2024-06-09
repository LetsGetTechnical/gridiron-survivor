import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from './page';

const mockRegisterAccount = jest.fn();
const mockLoginAccount = jest.fn();
const mockPush = jest.fn();

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
  let emailInput: HTMLElement;
  let passwordInput: HTMLElement;
  let confirmPasswordInput: HTMLElement;
  let continueButton: HTMLElement;

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
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');
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
    const email = 'test1@example.com';
    const password = 'password123';
    const confirmPassword = 'password123';

    fireEvent.change(emailInput, { target: { value: email } });
    fireEvent.change(passwordInput, { target: { value: password } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: confirmPassword },
    });
    fireEvent.click(continueButton);

    await waitFor(() => {
      expect(mockRegisterAccount).toHaveBeenCalledWith(
        email,
        password,
        confirmPassword,
      );
    });
  });

  test('redirects to /weeklyPicks when the button is clicked', () => {
    mockLoginAccount.mockResolvedValue({ emailInput, passwordInput });
    mockUseAuthContext.isSignedIn = true;

    render(<Register />);
    expect(mockPush).toHaveBeenCalledWith('/weeklyPicks');

    mockUseAuthContext.isSignedIn = false;
  });
});
