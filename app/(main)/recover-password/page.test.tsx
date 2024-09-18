import { recoverPassword } from '@/api/apiFunctions';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import RecoverPassword from './page';

jest.mock('@/api/apiFunctions', () => ({
  recoverPassword: jest.fn(),
}));

const mockPush = jest.fn();
const getUser = jest.fn();

let continueButton: HTMLElement, emailInput: HTMLInputElement;

const mockUseAuthContext = {
  getUser,
  isSignedIn: false,
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

jest.mock('react-hot-toast', () => ({
  custom: jest.fn(),
}));

describe('Recover Password', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render the recover password page', () => {
    render(<RecoverPassword />);
    emailInput = screen.getByTestId('email');
    continueButton = screen.getByTestId('recover-password-button');

    const headingElement = screen.getByRole('heading', { level: 1 });
    expect(headingElement).toHaveTextContent('Password Recovery');

    expect(emailInput).toBeInTheDocument();
    expect(continueButton).toBeInTheDocument();
  });

  test('should update email state when input value changes', () => {
    render(<RecoverPassword />);

    emailInput = screen.getByTestId('email');
    continueButton = screen.getByTestId('recover-password-button');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');
  });

  test('should call recoverPassword function and redirect to /login', async () => {
    jest.useFakeTimers();
    render(<RecoverPassword />);

    const emailInput = screen.getByTestId('email');
    const continueButton = screen.getByTestId('recover-password-button');

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.click(continueButton);
    });

    await waitFor(() => {
      expect(recoverPassword).toHaveBeenCalledWith({
        email: 'test@example.com',
      });
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(mockPush).toHaveBeenCalledWith('/login');
    jest.useRealTimers();
  });

  test('should not call recover password function when email is empty', async () => {
    render(<RecoverPassword />);

    const continueButton = screen.getByTestId('recover-password-button');

    await act(async () => {
      fireEvent.click(continueButton);
    });

    await waitFor(() => {
      expect(recoverPassword).not.toHaveBeenCalled();
    });
  });

  test('redirects to /league/all when user navigates to /recover-password and is signed in', async () => {
    mockUseAuthContext.isSignedIn = true;

    render(<RecoverPassword />);

    expect(mockPush).toHaveBeenCalledWith('/league/all');
  });
});
