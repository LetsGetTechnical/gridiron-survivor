import { AdminUserSettings } from './AdminUserSettings';
import {
  fireEvent,
  getByTestId,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import React from 'react';

const mockPush = jest.fn();
const mockUsePathname = jest.fn();
const mockLogoutAccount = jest.fn();

const mockUseAuthContext = {
  logoutAccount: mockLogoutAccount,
  isSignedIn: true,
};

jest.mock('../../context/AuthContextProvider', () => ({
  useAuthContext() {
    return {
      ...mockUseAuthContext,
    };
  },
}));

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: mockPush,
    };
  },
  usePathname() {
    return mockUsePathname();
  },
}));

describe('AdminUserSettings Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    render(<AdminUserSettings />);
  });

  it('should render the component', async () => {
    const adminUserSettings = screen.getByTestId('admin-user-settings');

    expect(adminUserSettings).toBeInTheDocument();
  });

  it('should show user options when clicked', () => {
    const adminUserSettings = screen.getByTestId('admin-user-settings');

    fireEvent.click(adminUserSettings);

    waitFor(() => {
      expect(screen.getByTestId('edit-profile-button')).toBeInTheDocument();
      expect(screen.getByTestId('sign-out-button')).toBeInTheDocument();
    });
  });

  it('should not show user options when closed', () => {
    const adminUserSettings = screen.getByTestId('admin-user-settings');

    fireEvent.click(adminUserSettings);

    fireEvent.click(adminUserSettings);

    waitFor(() => {
      expect(screen.getByTestId('edit-profile-button')).not.toBeInTheDocument();
      expect(screen.getByTestId('sign-out-button')).not.toBeInTheDocument();
    });
  });

  it('should direct to /admin/edit-profile route when the edit profile button is clicked', () => {
    const adminUserSettings = screen.getByTestId('admin-user-settings');

    fireEvent.click(adminUserSettings);

    waitFor(() => {
      const editProfileButton = screen.getByTestId('edit-profile-button');
      fireEvent.click(editProfileButton);
    });

    waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/user/edit');
    });
  });

  it('should direct to /login route when the sign out button is clicked', () => {
    const adminUserSettings = screen.getByTestId('admin-user-settings');

    fireEvent.click(adminUserSettings);

    waitFor(() => {
      const signOutButton = screen.getByTestId('sign-out-button');
      fireEvent.click(signOutButton);
    });

    waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/login');
    });
  });
});
