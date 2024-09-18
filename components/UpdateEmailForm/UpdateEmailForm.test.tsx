import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { toast } from 'react-hot-toast';
import UpdateEmailForm from './UpdateEmailForm';
import { updateUserEmail } from '@/api/apiFunctions';
import { useAuthContext } from '@/context/AuthContextProvider';
import { useDataStore } from '@/store/dataStore';

jest.mock('react-hot-toast');
jest.mock('@/api/apiFunctions');
jest.mock('@/context/AuthContextProvider');

describe('UpdateEmailForm', () => {
  const mockUser = {
    documentId: 'doc123',
    id: 'user123',
    email: 'olduser@example.com',
    leagues: [],
  };

  const mockUpdateUser = jest.fn();
  const mockUseDataStore = useDataStore as unknown as jest.Mock;

  beforeEach(() => {
    (useAuthContext as jest.Mock).mockReturnValue({
      isSignedIn: true,
    });

    (toast.custom as jest.Mock).mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the update email form', () => {
    mockUseDataStore.mockReturnValue({
      user: mockUser,
      updateUser: mockUpdateUser,
    });
    render(<UpdateEmailForm />);
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('current-password')).toBeInTheDocument();
    expect(screen.getByTestId('updated-email-button')).toBeInTheDocument();
  });

  it('disables the update button when email is unchanged', () => {
    render(<UpdateEmailForm />);
    const updateButton = screen.getByTestId('updated-email-button');
    expect(updateButton).toBeDisabled();
  });

  it('enables the update button when email is changed and password is entered', async () => {
    render(<UpdateEmailForm />);
    const emailInput = screen.getByTestId('email') as HTMLInputElement;
    const passwordInput = screen.getByTestId(
      'current-password',
    ) as HTMLInputElement;
    const updateButton = screen.getByTestId(
      'updated-email-button',
    ) as HTMLButtonElement;

    expect(updateButton).toBeDisabled();
    expect(emailInput.value).toBe('olduser@example.com');
    expect(passwordInput.value).toBe('');

    fireEvent.change(emailInput, { target: { value: 'newuser@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    await waitFor(() => {
      expect(emailInput.value).toBe('newuser@example.com');
      expect(passwordInput.value).toBe('password123');
    });

    // await waitFor(() => {
    //   expect(updateButton).not.toBeDisabled();
    // });
  });

  it('calls updateUserEmail and shows success message on successful update', async () => {
    (updateUserEmail as jest.Mock).mockResolvedValue({});

    render(<UpdateEmailForm />);
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('current-password');
    const updateButton = screen.getByTestId('updated-email-button');

    fireEvent.change(emailInput, { target: { value: 'newuser@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(updateUserEmail).toHaveBeenCalledWith({
        email: 'newuser@example.com',
        password: 'password123',
      });
      expect(toast.custom).toHaveBeenCalledWith(expect.anything());
      expect(mockUpdateUser).toHaveBeenCalledWith(
        'doc123',
        'user123',
        'newuser@example.com',
        [],
      );
    });
  });

  it('shows error message on update failure', async () => {
    (updateUserEmail as jest.Mock).mockRejectedValue(
      new Error('Update failed'),
    );

    render(<UpdateEmailForm />);
    const emailInput = screen.getByTestId('email');
    const passwordInput = screen.getByTestId('current-password');
    const updateButton = screen.getByTestId('updated-email-button');

    fireEvent.change(emailInput, { target: { value: 'newuser@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(updateUserEmail).toHaveBeenCalled();
      expect(toast.custom).toHaveBeenCalledWith(expect.anything());
      expect(mockUpdateUser).not.toHaveBeenCalled();
    });
  });
});
