import { render, screen, waitFor } from '@testing-library/react';
import Entry from './page';
import { useDataStore } from '@/store/dataStore';
import {
  getGameWeek,
  getCurrentUserEntries,
  getCurrentLeague,
} from '@/api/apiFunctions';

jest.mock('@/store/dataStore', () => ({
  useDataStore: jest.fn(() => ({ user: { id: '123', leagues: [] } })),
}));

jest.mock('@/api/apiFunctions', () => ({
  getCurrentLeague: jest.fn(() =>
    Promise.resolve({
      leagueName: 'Test League',
      participants: 12,
      survivors: 10,
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
  getGameWeek: jest.fn(() =>
    Promise.resolve({
      week: 1,
    }),
  ),
}));

describe('League entries page (Entry Component)', () => {
  const mockGetCurrentLeague = getCurrentLeague as jest.Mock;
  const mockGetCurrentUserEntries = getCurrentUserEntries as jest.Mock;
  const mockGetGameWeek = getGameWeek as jest.Mock;
  const mockUseDataStore = useDataStore as unknown as jest.Mock;

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

  it('should display the header with the league name, survivors, and week number, without a past weeks link', async () => {
    mockUseDataStore.mockReturnValueOnce({ user: { id: '123', leagues: [] } });
    mockGetGameWeek.mockResolvedValueOnce({ week: 1 });
    mockGetCurrentUserEntries.mockResolvedValueOnce([
      {
        id: '66311a210039f0532044',
        week: 1,
      },
    ]);
    mockGetCurrentLeague.mockResolvedValueOnce({
      leagueName: 'GiS League',
      participants: 47,
      survivors: 47,
    });

    render(<Entry params={{ leagueId: '66311a210039f0532044' }} />);

    await waitFor(() => {
      const entryPageHeader = screen.getByTestId('entry-page-header');
      const entryPageHeaderToLeaguesLink = screen.getByTestId(
        'entry-page-header-to-leagues-link',
      );
      const entryPageHeaderLeagueName = screen.getByTestId(
        'entry-page-header-league-name',
      );
      const entryPageHeaderLeagueSurvivors =
        screen.getByTestId('LeagueSurvivors');
      const entryPageHeaderCurrentWeek = screen.getByTestId(
        'entry-page-header-current-week',
      );

      expect(entryPageHeader).toBeInTheDocument();
      expect(entryPageHeaderToLeaguesLink).toBeInTheDocument();
      expect(entryPageHeaderToLeaguesLink).toHaveAttribute(
        'href',
        '/league/all',
      );
      expect(entryPageHeaderLeagueName).toBeInTheDocument();
      expect(entryPageHeaderLeagueName).toHaveTextContent('GiS League');
      expect(entryPageHeaderLeagueSurvivors).toBeInTheDocument();
      expect(entryPageHeaderLeagueSurvivors).toHaveTextContent('Survivors');
      expect(entryPageHeaderCurrentWeek).toBeInTheDocument();
      expect(entryPageHeaderCurrentWeek).toHaveTextContent('Week 1');
    });
  });

  it('should display the header with the league name, survivors, and week number, with a past weeks link', async () => {
    mockUseDataStore.mockReturnValueOnce({ user: { id: '123', leagues: [] } });
    mockGetGameWeek.mockResolvedValueOnce({ week: 2 });
    mockGetCurrentUserEntries.mockResolvedValueOnce([
      {
        id: '66311a210039f0532044',
        week: 2,
      },
    ]);
    mockGetCurrentLeague.mockResolvedValueOnce({
      leagueName: 'GiS League',
      participants: 47,
      survivors: 47,
    });

    render(<Entry params={{ leagueId: '66311a210039f0532044' }} />);

    await waitFor(() => {
      const entryPageHeader = screen.getByTestId('entry-page-header');
      const entryPageHeaderToLeaguesLink = screen.getByTestId(
        'entry-page-header-to-leagues-link',
      );
      const entryPageHeaderLeagueName = screen.getByTestId(
        'entry-page-header-league-name',
      );
      const entryPageHeaderLeagueSurvivors =
        screen.getByTestId('LeagueSurvivors');
      const entryPageHeaderCurrentWeek = screen.getByTestId(
        'entry-page-header-current-week',
      );
      const viewPastWeeksLink = screen.getByTestId('past-weeks-link');

      expect(entryPageHeader).toBeInTheDocument();
      expect(entryPageHeaderToLeaguesLink).toBeInTheDocument();
      expect(entryPageHeaderToLeaguesLink).toHaveAttribute(
        'href',
        '/league/all',
      );
      expect(entryPageHeaderLeagueName).toBeInTheDocument();
      expect(entryPageHeaderLeagueName).toHaveTextContent('GiS League');
      expect(entryPageHeaderLeagueSurvivors).toBeInTheDocument();
      expect(entryPageHeaderLeagueSurvivors).toHaveTextContent('Survivors');
      expect(entryPageHeaderCurrentWeek).toBeInTheDocument();
      expect(entryPageHeaderCurrentWeek).toHaveTextContent('Week 2');
      expect(viewPastWeeksLink).toBeInTheDocument();
    });
  });
});
