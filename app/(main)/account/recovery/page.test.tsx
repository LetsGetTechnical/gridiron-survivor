import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';
import ResetPassword from './page';
import { resetPassword } from '@/api/apiFunctions';
import { useAuthContext } from '@/context/AuthContextProvider';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';

jest.mock('react-hot-toast');
jest.mock('next/navigation');
jest.mock('@/context/AuthContextProvider');
jest.mock('@/api/apiFunctions');

describe('ResetPassword', () => {
  let mockUseSearchParams: jest.Mock;
  let mockRouter: { push: jest.Mock };
  let mockUseAuthContext: jest.Mock;
  let mockToast: jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers();
    mockUseSearchParams = jest.fn().mockImplementation((param: string) => {
      const params: { [key: string]: string } = {
        userId: '123',
        secret: 'abc',
        expire: '2023-12-31',
      };
      return params[param];
    });
    mockRouter = { push: jest.fn() };
    mockUseAuthContext = jest.fn().mockReturnValue({
      isSignedIn: false,
      getUser: jest.fn(),
    });
    mockToast = jest.fn();

    (useSearchParams as jest.Mock).mockReturnValue({
      get: mockUseSearchParams,
    });
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useAuthContext as jest.Mock).mockImplementation(mockUseAuthContext);
    (toast.custom as jest.Mock).mockImplementation(mockToast);
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  const fillFormAndSubmit = () => {
    fireEvent.change(screen.getByTestId('password'), {
      target: { value: 'newpassword123' },
    });
    fireEvent.change(screen.getByTestId('confirm-password'), {
      target: { value: 'newpassword123' },
    });
    fireEvent.click(screen.getByTestId('continue-button'));
  };

  it('should render the reset password form when all search params are present', async () => {
    render(<ResetPassword />);
    await screen.findByText('Reset Your Password');
    expect(screen.getByTestId('password')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-password')).toBeInTheDocument();
  });

  it('should redirect to login page when search params are missing', async () => {
    mockUseSearchParams.mockReturnValue(null);
    render(<ResetPassword />);
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith('/login');
    });
  });

  it('should submit the form and reset password successfully', async () => {
    (resetPassword as jest.Mock).mockResolvedValue({});
    render(<ResetPassword />);
    fillFormAndSubmit();

    await waitFor(() => {
      expect(resetPassword).toHaveBeenCalledWith({
        userId: '123',
        token: 'abc',
        password: 'newpassword123',
      });
      expect(mockToast).toHaveBeenCalledWith(
        <Alert
          variant={AlertVariants.Success}
          message="Your password has been reset successfully! Please login with your new password."
        />,
      );
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(mockRouter.push).toHaveBeenCalledWith('/login');
  });

  it('should show an error message when the token is invalid', async () => {
    const error = new Error('Invalid token') as Error & { type?: string };
    error.type = 'user_invalid_token';
    (resetPassword as jest.Mock).mockRejectedValue(error);

    render(<ResetPassword />);
    fillFormAndSubmit();

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        <Alert
          variant={AlertVariants.Error}
          message="Invalid recovery token. Your token may have expired or already been used.  Please try again."
        />,
      );
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(mockRouter.push).toHaveBeenCalledWith('/recover-password');
  });

  it('should show an error message when the password reset fails', async () => {
    (resetPassword as jest.Mock).mockRejectedValue(
      new Error('Error resetting password'),
    );

    render(<ResetPassword />);
    fillFormAndSubmit();

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith(
        <Alert
          variant={AlertVariants.Error}
          message="There was an error resetting your password."
        />,
      );
    });

    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(mockRouter.push).toHaveBeenCalledWith('/recover-password');
  });
});
