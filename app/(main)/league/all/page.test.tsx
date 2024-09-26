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
    user: {
      documentId: '123',
      id: '1234',
      email: 'test@test.com',
      leagues: ['league1'],
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
    updateUser: jest.fn(),
  })),
}));

jest.mock('@/utils/utils', () => ({
  getUserLeagues: jest.fn(() => Promise.resolve([])),
  cn: jest.fn(),
}));

jest.mock('@/api/apiFunctions', () => ({
  getAllLeagues: jest.fn(),
  addUserToLeague: jest.fn(),
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

    render(<Leagues />);

    await waitForElementToBeRemoved(() => screen.getByTestId('global-spinner'));

    await waitFor(() => {
      const messageElement = screen.getByTestId('no-leagues-message');
      expect(messageElement).toBeInTheDocument();
    });
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

    const user = {
      documentId: '123',
      email: 'test@test.com',
      id: '123',
      leagues: [],
    };

    const league = {
      leagueId: '123',
      leagueName: 'Test League',
      logo: 'logo.png',
      participants: [],
      survivors: [],
    };

    const updateUser = jest.fn();

    mockUseDataStore.mockReturnValue({
      user,
      allLeagues: [league],
      updateUser,
    });

    mockGetAllLeagues.mockResolvedValueOnce([league]);
    mockAddUserToLeague.mockResolvedValue(
      Promise.resolve({
        documentId: user.documentId,
        leagueId: league.leagueId,
        selectedLeagues: [...(user.leagues ?? []), league.leagueId],
        participants: [...(league.participants ?? []), user.id],
        survivors: [...(league.survivors ?? []), user.id],
      }),
    );

    render(<Leagues />);

    await waitFor(() => {
      expect(screen.queryByTestId('global-spinner')).not.toBeInTheDocument();
    });

    const selectElement = screen.getByTestId('select-available-leagues');
    fireEvent.change(selectElement, { target: { value: '123' } });
    fireEvent.click(screen.getByTestId('join-league-button'));

    await waitFor(() => {
      expect(mockAddUserToLeague).toHaveBeenCalledWith({
        userDocumentId: user.documentId,
        selectedLeague: league.leagueId,
        selectedLeagues: [league.leagueId],
        participants: [user.id],
        survivors: [user.id],
      });
      expect(updateUser).toHaveBeenCalledWith(
        user.documentId,
        user.id,
        user.email,
        [...user.leagues, league.leagueId],
      );
      expect(toast.custom).toHaveBeenCalledWith(
        <Alert
          variant={AlertVariants.Success}
          message={`Added ${league.leagueName} to your leagues!`}
        />,
      );
    });
  });

  test('should show error if adding to league fails', async () => {
    mockUseAuthContext.isSignedIn = true;

    const user = {
      documentId: '123',
      email: 'test@test.com',
      id: '123',
      leagues: [],
    };

    const league = {
      leagueId: '123',
      leagueName: 'Test League',
      logo: 'logo.png',
      participants: [],
      survivors: [],
    };

    mockUseDataStore.mockReturnValue({
      user,
      allLeagues: [league],
    });

    mockGetUserLeagues.mockResolvedValueOnce([]);
    mockGetAllLeagues.mockResolvedValueOnce([league]);
    mockAddUserToLeague.mockResolvedValue(
      Promise.resolve({
        userDocumentId: user.documentId,
        selectedLeague: league.leagueId,
        selectedLeagues: [league.leagueId],
        participants: [user.id],
        survivors: [user.id],
      }),
    );

    render(<Leagues />);

    await waitFor(() => {
      expect(screen.queryByTestId('global-spinner')).not.toBeInTheDocument();
    });

    const selectElement = screen.getByTestId('select-available-leagues');
    fireEvent.change(selectElement, { target: { value: '123' } });
    fireEvent.click(screen.getByTestId('join-league-button'));

    await waitFor(() => {
      expect(mockAddUserToLeague).toHaveBeenCalledWith({
        userDocumentId: user.documentId,
        userDocumentId: user.documentId,
        selectedLeague: league.leagueId,
        selectedLeagues: [league.leagueId],
        participants: [user.id],
        survivors: [user.id],
      });

      expect(toast.custom).toHaveBeenCalledWith(
        <Alert
          variant={AlertVariants.Error}
          message="Failed to add the league. Please try again."
        />,
      );
    });
  });
});
