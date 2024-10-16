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
import {
  getAllLeagues,
  addUserToLeague,
  getGameWeek,
  getCurrentUserEntries,
} from '@/api/apiFunctions';
import { toast } from 'react-hot-toast';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { mock } from 'node:test';

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
  useDataStore: jest.fn(),
}));

jest.mock('@/utils/utils', () => ({
  getUserLeagues: jest.fn(() => Promise.resolve([])),
  cn: jest.fn((className) => className),
}));

jest.mock('@/api/apiFunctions', () => ({
  getAllLeagues: jest.fn(),
  addUserToLeague: jest.fn(),
  getGameWeek: jest.fn(),
  getCurrentUserEntries: jest.fn(),
}));

const mockAllLeagues = [
  {
    leagueId: '123',
    leagueName: 'Test League',
    logo: 'https://findmylogo.com/logo.png',
    participants: ['123456', '78'],
    survivors: ['123456', '78', '9'],
  },
];

const mockEntries = [
  {
    $id: '123',
    name: 'Test Entry',
    user: '123',
    league: '123',
    selectedTeams: [],
    eliminated: false,
  },
];

const mockGameWeek = {
  id: '123',
  week: 1,
};

jest.mock('react-hot-toast', () => ({
  toast: {
    custom: jest.fn(),
  },
}));

const mockUseDataStore = useDataStore as jest.MockedFunction<
  typeof useDataStore
>;
const mockGetUserLeagues = getUserLeagues as jest.MockedFunction<
  typeof getUserLeagues
>;
const mockGetGameWeek = getGameWeek as jest.MockedFunction<typeof getGameWeek>;
const mockGetCurrentUserEntries = getCurrentUserEntries as jest.MockedFunction<
  typeof getCurrentUserEntries
>;

describe('Leagues Component', () => {
  const mockUpdateLeagues = jest.fn();
  const mockUpdateUserLeagues = jest.fn();
  const mockUpdateGameWeek = jest.fn();
  const mockUpdateEntries = jest.fn();
  const mockGetAllLeagues = getAllLeagues as jest.Mock;
  const mockAddUserToLeague = addUserToLeague as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseDataStore.mockReturnValue({
      user: { id: '123', leagues: [] },
      leagues: [],
      updateAllLeagues: mockUpdateLeagues,
      updateUserLeagues: mockUpdateUserLeagues,
      updateEntries: mockUpdateEntries,
      updateGameWeek: mockUpdateGameWeek,
    });
  });

  it('should display GlobalSpinner while loading data', async () => {
    render(<Leagues />);
    expect(screen.getByTestId('global-spinner')).toBeInTheDocument();
  });

  it('should render "You are not enrolled in any leagues" message when no leagues are found', async () => {
    mockUseAuthContext.isSignedIn = true;
    mockGetUserLeagues.mockResolvedValue([]);

    mockUseDataStore.mockReturnValue({
      user: {
        documentId: '123',
        email: 'test@test.com',
        id: '123',
        leagues: [],
      },
      allLeagues: mockAllLeagues,
      userLeagues: [],
    });

    render(<Leagues />);

    await waitForElementToBeRemoved(() => screen.getByTestId('global-spinner'));

    await waitFor(() => {
      const messageElement = screen.getByTestId('no-leagues-message');
      expect(messageElement).toBeInTheDocument();
    });
  });

  it('should not display GlobalSpinner after loading data', async () => {
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
      userLeagues: [],
    });

    mockGetUserLeagues.mockResolvedValueOnce([]);

    render(<Leagues />);

    await waitForElementToBeRemoved(() => screen.getByTestId('global-spinner'));

    expect(screen.queryByTestId('global-spinner')).not.toBeInTheDocument();
  });

  it('should handle form submission to join a league', async () => {
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
    const updateUserLeagues = jest.fn();
    const updateAllLeagues = jest.fn();
    const updateGameWeek = jest.fn();
    const updateEntries = jest.fn();

    mockUseDataStore.mockReturnValue({
      user,
      allLeagues: [league],
      updateUser,
      updateUserLeagues,
      userLeagues: [],
      updateAllLeagues,
      updateGameWeek,
      updateEntries,
    });

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
        selectedLeague: league.leagueId,
        selectedLeagues: [league.leagueId],
        participants: [user.id],
        survivors: [user.id],
      });
      expect(updateAllLeagues).toHaveBeenCalledWith([league]);
      expect(updateUserLeagues).toHaveBeenCalledWith([league]);
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

  it('should show error if adding to league fails', async () => {
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
    const updateUserLeagues = jest.fn();
    const updateAllLeagues = jest.fn();
    const updateGameWeek = jest.fn();
    const updateEntries = jest.fn();

    mockUseDataStore.mockReturnValue({
      user,
      allLeagues: [league],
      updateUser,
      updateUserLeagues,
      userLeagues: [],
      updateAllLeagues,
      updateGameWeek,
      updateEntries,
    });

    mockGetUserLeagues.mockResolvedValueOnce([]);
    mockGetAllLeagues.mockResolvedValueOnce([league]);
    mockAddUserToLeague.mockRejectedValue(new Error());

    render(<Leagues />);

    await waitFor(() => {
      expect(screen.queryByTestId('global-spinner')).not.toBeInTheDocument();
    });

    const selectElement = screen.getByTestId('select-available-leagues');
    fireEvent.change(selectElement, { target: { value: '123' } });
    fireEvent.click(screen.getByTestId('join-league-button'));

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
