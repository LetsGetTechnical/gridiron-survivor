import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { toast } from 'react-hot-toast';
import UpdateEmailForm from './UpdateEmailForm';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { updateUserEmail } from '@/api/apiFunctions';

jest.mock('react-hot-toast');
jest.mock('@/api/apiFunctions');
jest.mock(`@/store/dataStore`, () => ({
  useDataStore: jest.fn(() => ({
    user: { documentId: 'doc123', id: '123', email: 'olduser@example.com' },
    updateUser: jest.fn(),
  })),
}));

describe('UpdateEmailForm', () => {
  let mockToast: jest.Mock;

  beforeEach(() => {
    mockToast = jest.fn();
    (toast.custom as jest.Mock).mockImplementation(mockToast);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const fillForm = () => {
    fireEvent.change(screen.getByTestId('email'), {
      target: { value: 'newuser@example.com' },
    });
    fireEvent.change(screen.getByTestId('current-password'), {
      target: { value: 'password123' },
    });
  };

  it('should render the update email form with the update button disabled', () => {
    render(<UpdateEmailForm />);

    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('current-password')).toBeInTheDocument();
    expect(screen.getByTestId('updated-email-button')).toBeInTheDocument();
    expect(screen.getByTestId('updated-email-button')).toBeDisabled();
  });

  it('should update the form with new email and password and update button should be enabled', async () => {
    render(<UpdateEmailForm />);
    fillForm();

    await waitFor(() => {
      expect(screen.getByTestId('email')).toHaveValue('newuser@example.com');
      expect(screen.getByTestId('current-password')).toHaveValue('password123');
      expect(screen.getByTestId('updated-email-button')).not.toBeDisabled();
    });
  });
  it('should submit the form and update the user email successfully', async () => {
    render(<UpdateEmailForm />);
    fillForm();

    fireEvent.click(screen.getByTestId('updated-email-button'));

    await waitFor(() => {
      expect(updateUserEmail).toHaveBeenCalledWith({
        email: 'newuser@example.com',
        password: 'password123',
      });
      expect(screen.getByTestId('email')).toHaveValue('newuser@example.com');
      expect(screen.getByTestId('current-password')).toHaveValue('');

      expect(toast.custom).toHaveBeenCalledWith(
        <Alert
          variant={AlertVariants.Success}
          message="You have successfully updated your email."
        />,
      );
    });
  });
  it('should submit the form and show error message on update failure', async () => {
    (updateUserEmail as jest.Mock).mockRejectedValue(new Error());

    render(<UpdateEmailForm />);
    fillForm();

    fireEvent.click(screen.getByTestId('updated-email-button'));

    await waitFor(() => {
      expect(updateUserEmail).rejects.toThrow();

      expect(toast.custom).toHaveBeenCalledWith(
        <Alert variant={AlertVariants.Error} message="Email Update Failed!" />,
      );
    });
  });
});
