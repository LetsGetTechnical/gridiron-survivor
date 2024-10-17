import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import ResetPasswordForm from './ResetPasswordForm';
import { resetPassword } from '@/api/apiFunctions';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { useAuthContext } from '@/context/AuthContextProvider';

jest.mock('react-hot-toast');
jest.mock('next/navigation');
jest.mock('@/context/AuthContextProvider', () => ({
  useAuthContext: jest.fn(),
}));
jest.mock('@/api/apiFunctions');

describe('ResetPassword', () => {
  let mockRouter: { push: jest.Mock };
  let mockToast: jest.Mock;
  const mockLogoutAccount = jest.fn();

  beforeEach(() => {
    mockRouter = { push: jest.fn() };
    mockToast = jest.fn();

    (useAuthContext as jest.Mock).mockReturnValue({
      logoutAccount: mockLogoutAccount,
      isLoggedIn: true,
    });
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (toast.custom as jest.Mock).mockImplementation(mockToast);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const fillForm = () => {
    fireEvent.change(screen.getByTestId('old-password'), {
      target: { value: 'oldPassword123' },
    });
    fireEvent.change(screen.getByTestId('new-password'), {
      target: { value: 'newPassword123' },
    });
    fireEvent.click(screen.getByTestId('update-password-button'));
  };

  it('should render the reset password form with the update button disabled', async () => {
    render(<ResetPasswordForm />);

    expect(screen.getByTestId('old-password')).toBeInTheDocument();
    expect(screen.getByTestId('new-password')).toBeInTheDocument();
    expect(screen.getByTestId('update-password-button')).toBeDisabled();
  });

  it('should update the form with new password and update button should be enabled', async () => {
    render(<ResetPasswordForm />);
    fillForm();

    await waitFor(() => {
      expect(screen.getByTestId('old-password')).toHaveValue('oldPassword123');
      expect(screen.getByTestId('new-password')).toHaveValue('newPassword123');
      expect(screen.getByTestId('update-password-button')).not.toBeDisabled();
    });
  });

  it('should submit the form and update the user password successfully', async () => {
    render(<ResetPasswordForm />);
    fillForm();

    fireEvent.click(screen.getByTestId('update-password-button'));

    await waitFor(() => {
      expect(resetPassword).toHaveBeenCalledWith({
        newPassword: 'newPassword123',
        oldPassword: 'oldPassword123',
      });
      expect(screen.getByTestId('old-password')).toHaveValue('');
      expect(screen.getByTestId('new-password')).toHaveValue('');

      expect(toast.custom).toHaveBeenCalledWith(
        <Alert
          variant={AlertVariants.Success}
          message="You have successfully updated your password."
        />,
      );
    });
  });

  it('should submit the form and show error message on password update failure', async () => {
    (resetPassword as jest.Mock).mockRejectedValue(new Error());

    render(<ResetPasswordForm />);
    fillForm();

    fireEvent.click(screen.getByTestId('update-password-button'));

    await waitFor(() => {
      expect(resetPassword).rejects.toThrow();
      expect(toast.custom).toHaveBeenCalledWith(
        <Alert
          variant={AlertVariants.Error}
          message="Password Update Failed!"
        />,
      );
    });
  });

  it('should call logoutAccount when "Recover your password" is clicked', () => {
    render(<ResetPasswordForm />);

    fireEvent.click(screen.getByTestId('recover-password-link'));

    expect(mockLogoutAccount).toHaveBeenCalledTimes(1);
  });
});
