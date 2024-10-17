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

jest.mock('@/context/AuthContextProvider', () => ({
  useAuthContext: () => ({ isSignedIn: true }),
}));

jest.mock('@/store/dataStore');
jest.mock('@/utils/utils');
jest.mock('@/api/apiFunctions');
jest.mock('react-hot-toast');

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

const setup = (initialStoreState = {}) => {
  const mockStore = {
    user: mockUser,
    allLeagues: [mockLeague],
    userLeagues: [],
    updateUser: jest.fn(),
    updateUserLeagues: jest.fn(),
    updateAllLeagues: jest.fn(),
    updateGameWeek: jest.fn(),
    updateEntries: jest.fn(),
    ...initialStoreState,
  };

  (useDataStore as unknown as jest.Mock).mockReturnValue(mockStore);
  (getAllLeagues as jest.Mock).mockResolvedValue([mockLeague]);
  (getUserLeagues as jest.Mock).mockResolvedValue([]);
  (getCurrentUserEntries as jest.Mock).mockResolvedValue([]);
  (getGameWeek as jest.Mock).mockResolvedValue({ id: '123', week: 1 });

  return { mockStore };
};

describe('Leagues Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display GlobalSpinner while loading data', async () => {
    setup();
    render(<Leagues />);
    expect(screen.getByTestId('global-spinner')).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.getByTestId('global-spinner'));
  });

  it('should render "You are not enrolled in any leagues" message when no leagues are found', async () => {
    setup();
    render(<Leagues />);
    await waitForElementToBeRemoved(() => screen.getByTestId('global-spinner'));
    expect(screen.getByTestId('no-leagues-message')).toBeInTheDocument();
  });

  it('should call getCurrentUserEntries and getGameWeek when component loads and user has leagues', async () => {
    const userWithLeague = { ...mockUser, leagues: [mockLeague.leagueId] };
    const { mockStore } = setup({
      user: userWithLeague,
      userLeagues: [mockLeague],
    });

    (getUserLeagues as jest.Mock).mockResolvedValue([mockLeague]);

    render(<Leagues />);

    await waitForElementToBeRemoved(() => screen.getByTestId('global-spinner'));

    await waitFor(() => {
      expect(getAllLeagues).toHaveBeenCalled();
      expect(getUserLeagues).toHaveBeenCalledWith(userWithLeague.leagues);
      expect(getCurrentUserEntries).toHaveBeenCalledWith(
        userWithLeague.id,
        mockLeague.leagueId,
      );
      expect(getGameWeek).toHaveBeenCalled();
      expect(mockStore.updateAllLeagues).toHaveBeenCalled();
      expect(mockStore.updateUserLeagues).toHaveBeenCalled();
      expect(mockStore.updateEntries).toHaveBeenCalled();
      expect(mockStore.updateGameWeek).toHaveBeenCalled();
    });
  });

  it('should handle form submission to join a league', async () => {
    const { mockStore } = setup();
    (addUserToLeague as jest.Mock).mockResolvedValue({
      userDocumentId: mockUser.documentId,
      selectedLeague: mockLeague.leagueId,
      selectedLeagues: [mockLeague.leagueId],
      participants: [mockUser.id],
      survivors: [mockUser.id],
    });

    render(<Leagues />);
    await waitForElementToBeRemoved(() => screen.getByTestId('global-spinner'));

    fireEvent.change(screen.getByTestId('select-available-leagues'), {
      target: { value: '123' },
    });
    fireEvent.click(screen.getByTestId('join-league-button'));

    await waitFor(() => {
      expect(addUserToLeague).toHaveBeenCalledWith(
        expect.objectContaining({
          userDocumentId: mockUser.documentId,
          selectedLeague: mockLeague.leagueId,
        }),
      );
      expect(mockStore.updateAllLeagues).toHaveBeenCalledWith([mockLeague]);
      expect(mockStore.updateUserLeagues).toHaveBeenCalledWith([mockLeague]);
      expect(mockStore.updateUser).toHaveBeenCalledWith(
        mockUser.documentId,
        mockUser.id,
        mockUser.email,
        [mockLeague.leagueId],
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
    setup();
    (addUserToLeague as jest.Mock).mockRejectedValue(new Error());

    render(<Leagues />);
    await waitForElementToBeRemoved(() => screen.getByTestId('global-spinner'));

    fireEvent.change(screen.getByTestId('select-available-leagues'), {
      target: { value: '123' },
    });
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
