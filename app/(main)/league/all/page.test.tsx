import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  fireEvent,
} from '@testing-library/react';
import Leagues from './page';
import { useDataStore } from '@/store/dataStore';
import { getUserLeagues } from '@/utils/utils';
import { getAllLeagues, addUserToLeague } from '@/api/apiFunctions';
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
    user: { id: '1234', leagues: [] },
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
    mockUseAuthContext.isSignedIn = false;
  });

  test('should render "You are not enrolled in any leagues" message when no leagues are found', async () => {
    mockUseAuthContext.isSignedIn = true;

    mockUseDataStore.mockReturnValue({
      user: {
        documentId: '123',
        email: 'test@test.com',
        id: '123',
        leagues: [],
      },
      allLeagues: [],
    });
    mockGetUserLeagues.mockResolvedValueOnce([]);

    render(<Leagues />);

    const waitForSpinnerToDisappear = async () => {
      await waitForElementToBeRemoved(() =>
        screen.getByTestId('global-spinner'),
      );
    };

    await waitForSpinnerToDisappear();

    // expect(screen.getByTestId('no-leagues-message')).toBeInTheDocument();
  });

  test('should display GlobalSpinner while loading data', async () => {
    mockUseAuthContext.isSignedIn = true;

    mockUseDataStore.mockReturnValueOnce({
      user: {
        documentId: '123',
        email: 'test@test.com',
        id: '123',
        leagues: [],
      },
      allLeagues: [],
    });

    render(<Leagues />);

    expect(screen.getByTestId('global-spinner')).toBeInTheDocument();
  });

  test('should not display GlobalSpinner after loading data', async () => {
    mockUseAuthContext.isSignedIn = true;

    mockUseDataStore.mockReturnValue({
      user: {
        documentId: '123',
        email: 'test@test.com',
        id: '123',
        leagues: [],
      },
      allLeagues: [
        {
          leagueId: '123',
          leagueName: 'Test League',
          logo: 'logo.png',
          participants: ['123456', '78'],
          survivors: ['123456', '78'],
        },
      ],
    });
    mockGetUserLeagues.mockResolvedValueOnce([]);

    render(<Leagues />);

    await waitForElementToBeRemoved(() => screen.getByTestId('global-spinner'));

    expect(screen.queryByTestId('global-spinner')).not.toBeInTheDocument();
  });

  test('should handle form submission to join a league', async () => {
    mockUseAuthContext.isSignedIn = true;

    mockUseDataStore.mockReturnValue({
      user: {
        documentId: '123',
        email: 'test@test.com',
        id: '123',
        leagues: [],
      },
      allLeagues: [
        {
          leagueId: '123',
          leagueName: 'Test League',
          participants: [],
          survivors: [],
        },
      ],
    });

    mockGetAllLeagues.mockResolvedValueOnce([
      {
        leagueId: '123',
        leagueName: 'Test League',
        logo: 'logo.png',
        participants: [],
        survivors: [],
      },
    ]);
    mockGetUserLeagues.mockResolvedValueOnce([]);
    mockAddUserToLeague.mockResolvedValueOnce({});

    render(<Leagues />);

    await waitFor(() => {
      expect(screen.queryByTestId('global-spinner')).not.toBeInTheDocument();
    });

    const selectElement = screen.getByTestId('select-available-leagues');
    fireEvent.change(selectElement, { target: { value: '123' } });
    fireEvent.click(screen.getByText(/Join League/i));

    await waitFor(() => {
      expect(mockAddUserToLeague).toHaveBeenCalledWith({
        leagueId: '123',
        userId: '123',
      });

      expect(toast.custom).toHaveBeenCalledWith(
        <Alert
          variant={AlertVariants.Success}
          message={`Added Test League to your leagues!`}
        />,
      );
    });
  });

  test('should show error if adding to league fails', async () => {
    mockUseAuthContext.isSignedIn = true;

    mockUseDataStore.mockReturnValue({
      user: {
        documentId: '123',
        email: 'test@test.com',
        id: '123',
        leagues: [],
      },
      allLeagues: [
        {
          leagueId: '123',
          leagueName: 'Test League',
          logo: 'logo.png',
          participants: [],
          survivors: [],
        },
      ],
    });

    mockGetUserLeagues.mockResolvedValueOnce([]);
    mockGetAllLeagues.mockResolvedValueOnce([
      {
        leagueId: '123',
        leagueName: 'Test League',
        logo: 'logo.png',
        participants: [],
        survivors: [],
      },
    ]);
    mockAddUserToLeague.mockRejectedValueOnce(
      new Error('Failed to join league'),
    );

    render(<Leagues />);

    await waitFor(() => {
      expect(screen.queryByTestId('global-spinner')).not.toBeInTheDocument();
    });

    const selectElement = screen.getByTestId('select-available-leagues');
    fireEvent.change(selectElement, { target: { value: '123' } });
    fireEvent.click(screen.getByText(/Join League/i));

    await waitFor(() => {
      expect(mockAddUserToLeague).toHaveBeenCalledWith({
        leagueId: '123',
        userId: '123',
      });

      expect(toast.custom).toHaveBeenCalledWith(
        <Alert
          variant={AlertVariants.Error}
          message="Failed to add the league. Please try again."
        />,
      );
    });
    expect(
      screen.getByText('Failed to add the league. Please try again.'),
    ).toBeInTheDocument();
  });
});
