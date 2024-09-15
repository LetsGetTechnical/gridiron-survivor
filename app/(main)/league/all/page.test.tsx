import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Leagues from './page';
import { useDataStore } from '@/store/dataStore';
import { getUserLeagues } from '@/utils/utils';
import { getAllLeagues, addUserToLeague } from '@/api/apiFunctions';
import { AuthContext } from '@/context/AuthContextProvider';
import { toast } from 'react-hot-toast';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';

const mockUseAuthContext = {
  isSignedIn: false,
};

jest.mock('@/context/AuthContextProvider', () => ({
  useAuthContext() {
    return {
      ...mockUseAuthContext,
    };
  },
}));

jest.mock('@/store/dataStore', () => ({
  useDataStore: jest.fn(() => ({
    user: { id: '123', leagues: [] },
    allLeagues: [
      {
        leagueId: '123',
        leagueName: 'Test League',
        logo: 'logo.png',
        participants: ['123456', '78'],
        survivors: ['123456', '78', '9'],
      },
    ],
  })),
}));

jest.mock('@/utils/utils', () => ({
  getUserLeagues: jest.fn(() => Promise.resolve([])),
}));

jest.mock('@/api/apiFunctions', () => ({
  getGameWeek: jest.fn(() =>
    Promise.resolve({
      week: 1,
    }),
  ),
  getAllLeagues: jest.fn(() =>
    Promise.resolve([
      {
        leagueId: '123',
        leagueName: 'Test League',
        logo: 'logo.png',
        participants: ['123456', '78', '9'],
        survivors: ['123456', '78'],
      },
    ]),
  ),
  addUserToLeague: jest.fn(() => Promise.resolve({})),
}));

// jest.mock('@/context/AuthContextProvider', () => ({
//   useAuthContext: jest.fn(() => ({ isSignedIn: true, user: { id: '123' } })),
// }));

jest.mock('react-hot-toast', () => ({
  toast: {
    custom: jest.fn(),
  },
}));

describe('Leagues Component', () => {
  const mockUseDataStore = useDataStore as unknown as jest.Mock;
  const mockGetUserLeagues = getUserLeagues as jest.Mock;
  const mockGetAllLeagues = getAllLeagues as jest.Mock;
  const mockAddUserToLeague = addUserToLeague as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render "You are not enrolled in any leagues" message when no leagues are found', async () => {
    mockUseAuthContext.isSignedIn = true;

    mockUseDataStore.mockReturnValueOnce({ user: { id: '123', leagues: [] } });
    mockGetUserLeagues.mockResolvedValueOnce([]);
    render(<Leagues />);

    await waitFor(() => {
      expect(
        screen.getByText('You are not enrolled in any leagues'),
      ).toBeInTheDocument();
    });
  });

  test('should display GlobalSpinner while loading data', async () => {
    mockUseAuthContext.isSignedIn = true;

    mockUseDataStore.mockReturnValueOnce({
      user: { id: '123', leagues: [] },
      allLeagues: [],
    });

    render(<Leagues />);

    await waitFor(() => {
      expect(screen.getByTestId('global-spinner')).toBeInTheDocument();
    });
  });

  test('should not display GlobalSpinner after loading data', async () => {
    mockUseAuthContext.isSignedIn = true;

    mockUseDataStore.mockReturnValueOnce({
      user: { id: '123', leagues: [] },
      allLeagues: [
        {
          leagueId: '123',
          leagueName: 'Test League',
          logo: 'logo.png',
          participants: ['123456', '78'],
          survivors: ['123456', '78', '9'],
        },
      ],
    });
    mockGetUserLeagues.mockResolvedValueOnce([]);

    render(<Leagues />);

    await waitFor(() => {
      expect(screen.queryByTestId('global-spinner')).not.toBeInTheDocument();
    });
  });

  test('should handle form submission to join a league', async () => {
    mockUseDataStore.mockReturnValueOnce({
      user: { id: '123', leagues: [] },
      allLeagues: [
        {
          leagueId: '123',
          leagueName: 'Test League',
          logo: 'logo.png',
          participants: ['123456', '78'],
          survivors: ['123456', '78', '9'],
        },
      ],
    });
    mockGetUserLeagues.mockResolvedValueOnce([]);

    render(<Leagues />);

    await waitFor(() => {
      expect(screen.queryByTestId('global-spinner')).not.toBeInTheDocument();
    });

    const selectElement = screen.getByTestId('select-available-leagues');
    expect(selectElement).toBeInTheDocument();

    fireEvent.change(selectElement, { target: { value: '123' } });
    fireEvent.click(screen.getByText(/Join League/i));

    await waitFor(() => {
      expect(mockAddUserToLeague).toHaveBeenCalledWith({
        userDocumentId: '123',
        selectedLeague: '123',
        selectedLeagues: ['123'],
        participants: ['123456', '78', '123'],
        survivors: ['123456', '78', '9', '123'],
      });

      expect(toast.custom).toHaveBeenCalledWith(
        <Alert
          variant={AlertVariants.Success}
          message={`Added test league to your leagues!`}
        />,
      );
    });
  });
  test('should show error if adding to league fails', async () => {
    mockAddUserToLeague.mockRejectedValueOnce(
      new Error('Failed to join league'),
    );
    render(<Leagues />);

    const selectElement = screen.getByTestId('select-available-leagues');
    fireEvent.change(selectElement, { target: { value: '123' } });
    fireEvent.click(screen.getByText(/Join League/i));
    await waitFor(() => {
      expect(toast.custom).toHaveBeenCalledWith(
        <Alert
          variant={AlertVariants.Error}
          message="Failed to add the league. Please try again."
        />,
      );
    });
  });
});
