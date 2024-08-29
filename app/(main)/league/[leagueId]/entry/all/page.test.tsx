import { render, screen, waitFor } from '@testing-library/react';
import Entry from './page';
import { useDataStore } from '@/store/dataStore';
import { getGameWeek, getCurrentUserEntries } from '@/api/apiFunctions';

jest.mock('@/store/dataStore', () => ({
  useDataStore: jest.fn(() => ({ user: { id: '123', leagues: [] } })),
}));

jest.mock('@/api/apiFunctions', () => ({
  getGameWeek: jest.fn(() =>
    Promise.resolve({
      week: 1,
    }),
  ),
  getCurrentUserEntries: jest.fn(() =>
    Promise.resolve([
      {
        id: '123',
        week: 1,
        selectedTeams: [],
      },
    ]),
  ),
}));

jest.mock('@/components/LeagueEntries/LeagueEntries', () => ({
  LeagueEntries: ({
    isPickSet,
    teamLogo,
  }: {
    isPickSet: boolean;
    teamLogo?: string;
  }) => (
    <div data-testid="league-entry">
      {!isPickSet && (
        <span data-testid="league-entry__make-pick-text">Make Pick</span>
      )}
      {isPickSet && teamLogo && (
        <img
          src={teamLogo}
          alt="Team Logo"
          data-testid="league-entry__team-logo"
        />
      )}
      <button data-testid="league-entry__button">
        {isPickSet ? 'Edit Pick' : 'Make Pick'}
      </button>
    </div>
  ),
}));

describe('Entry Component', () => {
  const mockUseDataStore = useDataStore as jest.Mock;
  const mockGetGameWeek = getGameWeek as jest.Mock;
  const mockGetCurrentUserEntries = getCurrentUserEntries as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should display GlobalSpinner while loading data', async () => {
    mockUseDataStore.mockReturnValueOnce({ user: { id: '123', leagues: [] } });
    mockGetGameWeek.mockResolvedValueOnce({ week: 1 });
    mockGetCurrentUserEntries.mockResolvedValueOnce([
      {
        id: '123',
        week: 1,
      },
    ]);
    render(<Entry params={{ leagueId: '123' }} />);

    await waitFor(() => {
      expect(screen.getByTestId('global-spinner')).toBeInTheDocument();
    });
  });

  test('should not display GlobalSpinner after data is loaded', async () => {
    mockUseDataStore.mockReturnValueOnce({ user: { id: '123', leagues: [] } });
    mockGetGameWeek.mockResolvedValueOnce({ week: 1 });
    mockGetCurrentUserEntries.mockResolvedValueOnce([
      {
        id: '123',
        week: 1,
      },
    ]);

    render(<Entry params={{ leagueId: '123' }} />);

    await waitFor(() => {
      expect(screen.queryByTestId('global-spinner')).not.toBeInTheDocument();
    });
  });
  test('should display "Make Pick" button when no pick is set', async () => {
    mockUseDataStore.mockReturnValueOnce({ user: { id: '123', leagues: [] } });
    mockGetGameWeek.mockResolvedValueOnce({ week: 1 });
    mockGetCurrentUserEntries.mockResolvedValueOnce([
      {
        $id: '123',
        name: 'Test Entry',
        week: 1,
        selectedTeams: [],
      },
    ]);

    render(<Entry params={{ leagueId: '123' }} />);

    await waitFor(() => {
      expect(screen.getByTestId('league-entry__button')).toHaveTextContent(
        'Make Pick',
      );

      expect(
        screen.getByTestId('league-entry__make-pick-text'),
      ).toBeInTheDocument();
    });
  });

  test('should render team logo and change button to "Edit Pick" when a pick is made', async () => {
    mockUseDataStore.mockReturnValueOnce({ user: { id: '123', leagues: [] } });
    mockGetGameWeek.mockResolvedValueOnce({ week: 1 });
    mockGetCurrentUserEntries.mockResolvedValueOnce([
      {
        $id: '123',
        name: 'Test Entry',
        week: 1,
        selectedTeams: [
          {
            teamId: '1',
            teamName: 'Team A',
            teamLogo: 'team-a-logo.png',
          },
        ],
      },
    ]);

    render(<Entry params={{ leagueId: '123' }} />);

    await waitFor(() => {
      expect(screen.getByTestId('league-entry__team-logo')).toHaveAttribute(
        'src',
        'team-a-logo.png',
      );

      expect(screen.getByTestId('league-entry__button')).toHaveTextContent(
        'Edit Pick',
      );
    });
  });
});
