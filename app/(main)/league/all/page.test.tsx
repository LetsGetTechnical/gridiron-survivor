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

const mockUser = {
  documentId: '123',
  email: 'test@test.com',
  id: '123',
  leagues: [],
};

const mockLeague = {
  leagueId: '123',
  leagueName: 'Test League',
  logo: 'logo.png',
  participants: [],
  survivors: [],
};

const mockAllLeagues = [
  {
    leagueId: '1234',
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
  const mockUpdateUser = jest.fn();
  const mockUpdateAllLeagues = jest.fn();
  const mockUpdateUserLeagues = jest.fn();
  const mockUpdateEntries = jest.fn();
  const mockUpdateGameWeek = jest.fn();
  const mockGetAllLeagues = getAllLeagues as jest.Mock;
  const mockAddUserToLeague = addUserToLeague as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuthContext.isSignedIn = true;
    mockUseDataStore.mockReturnValue({
      user: mockUser,
      allLeagues: mockAllLeagues,
      userLeagues: [],
      updateAllLeagues: mockUpdateAllLeagues,
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
    render(<Leagues />);

    await waitForElementToBeRemoved(() => screen.getByTestId('global-spinner'));

    await waitFor(() => {
      const messageElement = screen.getByTestId('no-leagues-message');
      expect(messageElement).toBeInTheDocument();
    });
  });

  it('should not display GlobalSpinner after loading data', async () => {
    render(<Leagues />);

    await waitForElementToBeRemoved(() => screen.getByTestId('global-spinner'));

    expect(screen.queryByTestId('global-spinner')).not.toBeInTheDocument();
  });

  it('should handle form submission to join a league', async () => {
    mockUseDataStore.mockReturnValue({
      user: mockUser,
      allLeagues: [mockLeague],
      userLeagues: [],
      updateUser: mockUpdateUser,
      updateUserLeagues: mockUpdateUserLeagues,
      updateAllLeagues: mockUpdateAllLeagues,
      updateGameWeek: mockUpdateGameWeek,
      updateEntries: mockUpdateEntries,
    });

    mockGetAllLeagues.mockResolvedValueOnce([mockLeague]);
    mockAddUserToLeague.mockResolvedValue(
      Promise.resolve({
        userDocumentId: mockUser.documentId,
        selectedLeague: mockLeague.leagueId,
        selectedLeagues: [mockLeague.leagueId],
        participants: [mockUser.id],
        survivors: [mockUser.id],
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
        userDocumentId: mockUser.documentId,
        selectedLeague: mockLeague.leagueId,
        selectedLeagues: [mockLeague.leagueId],
        participants: [mockUser.id],
        survivors: [mockUser.id],
      });
      expect(mockUpdateAllLeagues).toHaveBeenCalledWith([mockLeague]);
      expect(mockUpdateUserLeagues).toHaveBeenCalledWith([mockLeague]);
      expect(mockUpdateUser).toHaveBeenCalledWith(
        mockUser.documentId,
        mockUser.id,
        mockUser.email,
        [...mockUser.leagues, mockLeague.leagueId],
      );
      expect(toast.custom).toHaveBeenCalledWith(
        <Alert
          variant={AlertVariants.Success}
          message={`Added ${mockLeague.leagueName} to your leagues!`}
        />,
      );
    });
  });

  it('should show error if adding to league fails', async () => {
    mockUseDataStore.mockReturnValue({
      user: mockUser,
      allLeagues: [mockLeague],
      userLeagues: [],
      updateUser: mockUpdateUser,
      updateUserLeagues: mockUpdateUserLeagues,
      updateAllLeagues: mockUpdateAllLeagues,
      updateGameWeek: mockUpdateGameWeek,
      updateEntries: mockUpdateEntries,
    });
    mockGetUserLeagues.mockResolvedValueOnce([]);
    mockGetAllLeagues.mockResolvedValueOnce([mockLeague]);
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
