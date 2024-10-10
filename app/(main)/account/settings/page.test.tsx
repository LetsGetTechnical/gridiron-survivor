import { render, screen, waitFor } from '@testing-library/react';
import { useAuthContext } from '@/context/AuthContextProvider';
import AccountSettings from './page';

jest.mock('@/context/AuthContextProvider');

describe('Account Settings Page', () => {
  let mockUseAuthContext: jest.Mock;

  beforeEach(() => {
    mockUseAuthContext = jest.fn();
    (useAuthContext as jest.Mock).mockImplementation(mockUseAuthContext);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should display GlobalSpinner while loading data', async () => {
    mockUseAuthContext.mockReturnValue({
      isSignedIn: false,
    });
    render(<AccountSettings />);

    await waitFor(() => {
      expect(screen.getByTestId('global-spinner')).toBeInTheDocument();
    });
  });

  it('should not show GlobalSpinner and render the settings page', async () => {
    mockUseAuthContext.mockReturnValue({
      isSignedIn: true,
    });

    render(<AccountSettings />);

    expect(screen.getByTestId('settings-page-header')).toBeInTheDocument();
    expect(screen.getByTestId('email')).toBeInTheDocument();
    expect(screen.getByTestId('current-password')).toBeInTheDocument();
    expect(screen.getByTestId('old-password')).toBeInTheDocument();
    expect(screen.getByTestId('new-password')).toBeInTheDocument();

    expect(screen.queryByTestId('global-spinner')).not.toBeInTheDocument();
  });
});
