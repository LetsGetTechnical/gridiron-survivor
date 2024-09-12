import { render, screen, waitFor } from '@testing-library/react';
import Entry from './page';
import { useDataStore } from '@/store/dataStore';
import {
  getGameWeek,
  getCurrentUserEntries,
  getCurrentLeague,
} from '@/api/apiFunctions';

jest.mock('@/store/dataStore', () => ({
  useDataStore: jest.fn(() => ({
    currentWeek: 1,
    NFLTeams: [
      {
        teamId: '1',
        teamLogo: 'team-a-logo.png',
        teamName: 'Packers',
      },
    ],
    user: { id: '123', leagues: [] },
    updateCurrentWeek: jest.fn(),
    updateNFLTeams: jest.fn(),
  })),
}));

jest.mock('@/api/apiFunctions', () => ({
  getCurrentLeague: jest.fn(() =>
    Promise.resolve({
      leagueName: 'Test League',
      participants: 12,
      survivors: 10,
    }),
  ),
  getCurrentUserEntries: jest.fn(),
  getGameWeek: jest.fn(() =>
    Promise.resolve({
      week: 1,
    }),
  ),
  getNFLTeams: jest.fn(() =>
    Promise.resolve([
      {
        teamId: '1',
        teamLogo: 'team-a-logo.png',
        teamName: 'Packers',
      },
    ]),
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
    mockGetCurrentUserEntries.mockResolvedValueOnce([
      {
        $id: '66311a210039f0532044',
        name: 'Entry 1',
        user: '1',
        league: '1',
        selectedTeams: '',
        eliminated: false,
      },
    ]);
    mockGetCurrentLeague.mockResolvedValueOnce({
      leagueName: 'GiS League',
      participants: 47,
      survivors: 47,
    });

    render(<Entry params={{ leagueId: '123' }} />);

    await waitFor(() => {
      expect(screen.getByTestId('global-spinner')).toBeInTheDocument();
    });
  });

  test('should not display GlobalSpinner after data is loaded', async () => {
    mockGetCurrentUserEntries.mockResolvedValueOnce([
      {
        $id: '66311a210039f0532044',
        name: 'Entry 1',
        user: '1',
        league: '1',
        selectedTeams: '',
        eliminated: false,
      },
    ]);
    mockGetCurrentLeague.mockResolvedValueOnce({
      leagueName: 'GiS League',
      participants: 47,
      survivors: 47,
    });

    render(<Entry params={{ leagueId: '123' }} />);

    await waitFor(() => {
      expect(mockGetGameWeek).toHaveBeenCalled();
      expect(mockGetCurrentUserEntries).toHaveBeenCalled();
      expect(mockGetCurrentLeague).toHaveBeenCalled();
    });

    expect(screen.queryByTestId('global-spinner')).not.toBeInTheDocument();
  });

  it('should display the header with the league name, survivors, and week number, without a past weeks link', async () => {
    mockGetCurrentUserEntries.mockResolvedValueOnce([
      {
        $id: '66311a210039f0532044',
        name: 'Entry 1',
        user: '1',
        league: '1',
        selectedTeams: '',
        eliminated: false,
      },
    ]);
    mockGetCurrentLeague.mockResolvedValueOnce({
      leagueName: 'GiS League',
      participants: 47,
      survivors: 47,
    });

    render(<Entry params={{ leagueId: '66311a210039f0532044' }} />);

    await waitFor(() => {
      expect(mockGetGameWeek).toHaveBeenCalled();
      expect(mockGetCurrentUserEntries).toHaveBeenCalled();
      expect(mockGetCurrentLeague).toHaveBeenCalled();
    });

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
    expect(entryPageHeaderLeagueName).toBeInTheDocument();
    expect(entryPageHeaderLeagueName).toHaveTextContent('GiS League');
    expect(entryPageHeaderLeagueSurvivors).toBeInTheDocument();
    expect(entryPageHeaderLeagueSurvivors).toHaveTextContent('Survivors');
    expect(entryPageHeaderCurrentWeek).toBeInTheDocument();
    expect(entryPageHeaderCurrentWeek).toHaveTextContent('Week 1');
  });

  it('should display the header with the league name, survivors, and week number, with a past weeks link and add new entry button', async () => {
    mockUseDataStore.mockReturnValue({
      ...mockUseDataStore(),
      currentWeek: 2,
    });
    mockGetCurrentUserEntries.mockResolvedValueOnce([
      {
        $id: '66311a210039f0532044',
        name: 'Entry 1',
        user: '1',
        league: '1',
        selectedTeams: '',
        eliminated: false,
      },
    ]);
    mockGetCurrentLeague.mockResolvedValueOnce({
      leagueName: 'GiS League',
      participants: 47,
      survivors: 47,
    });

    render(<Entry params={{ leagueId: '66311a210039f0532044' }} />);

    await waitFor(() => {
      expect(mockGetGameWeek).toHaveBeenCalled();
      expect(mockGetCurrentUserEntries).toHaveBeenCalled();
      expect(mockGetCurrentLeague).toHaveBeenCalled();
    });

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
    const addNewEntryButton = screen.getByTestId('add-new-entry-button');

    expect(entryPageHeader).toBeInTheDocument();
    expect(entryPageHeaderToLeaguesLink).toBeInTheDocument();
    expect(entryPageHeaderLeagueName).toBeInTheDocument();
    expect(entryPageHeaderLeagueName).toHaveTextContent('GiS League');
    expect(entryPageHeaderLeagueSurvivors).toBeInTheDocument();
    expect(entryPageHeaderLeagueSurvivors).toHaveTextContent('Survivors');
    expect(entryPageHeaderCurrentWeek).toBeInTheDocument();
    expect(entryPageHeaderCurrentWeek).toHaveTextContent('Week 2');
    expect(addNewEntryButton).toBeInTheDocument();
    expect(viewPastWeeksLink).toBeInTheDocument();
  });

  it('should not display a button to add a new entry if there are more than 5 entries', async () => {
    mockUseDataStore.mockReturnValue({
      ...mockUseDataStore(),
      currentWeek: 2,
    });
    mockGetCurrentUserEntries.mockResolvedValueOnce([
      {
        $id: '66311a210039f0532044',
        name: 'Entry 1',
        user: '1',
        league: '1',
        selectedTeams: '',
        eliminated: false,
      },
      {
        $id: '66311a210039f0532045',
        name: 'Entry 2',
        user: '1',
        league: '1',
        selectedTeams: '',
        eliminated: false,
      },
      {
        $id: '66311a210039f0532046',
        name: 'Entry 3',
        user: '1',
        league: '1',
        selectedTeams: '',
        eliminated: false,
      },
      {
        $id: '66311a210039f0532047',
        name: 'Entry 4',
        user: '1',
        league: '1',
        selectedTeams: '',
        eliminated: false,
      },
      {
        $id: '66311a210039f0532048',
        name: 'Entry 5',
        user: '1',
        league: '1',
        selectedTeams: '',
        eliminated: false,
      },
    ]);
    mockGetCurrentLeague.mockResolvedValueOnce({
      leagueName: 'GiS League',
      participants: 47,
      survivors: 47,
    });

    render(<Entry params={{ leagueId: '66311a210039f0532044' }} />);

    // Wait for the component to render
    await waitFor(() => {
      expect(mockGetGameWeek).toHaveBeenCalled();
      expect(mockGetCurrentUserEntries).toHaveBeenCalled();
      expect(mockGetCurrentLeague).toHaveBeenCalled();
    });

    expect(
      screen.queryByTestId('add-new-entry-button'),
    ).not.toBeInTheDocument();
  });
  it('should display "Make Pick" button when no pick is set', async () => {
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
      expect(screen.getByTestId('league-entry-pick-button')).toHaveTextContent(
        'Make Pick',
      );
    });
  });

  it('should render team logo and change button to "Change Pick" when a pick is made', async () => {
    mockUseDataStore.mockReturnValue({
      ...mockUseDataStore(),
      currentWeek: 1,
    });
    mockGetCurrentUserEntries.mockResolvedValueOnce([
      {
        $id: '123',
        name: 'Test Entry',
        week: 1,
        selectedTeams: ['Packers'],
      },
    ]);
    render(<Entry params={{ leagueId: '123' }} />);

    await waitFor(() => {
      expect(screen.getByTestId('league-entry-logo')).toHaveAttribute(
        'src',
        'team-a-logo.png',
      );

      expect(screen.getByTestId('league-entry-pick-button')).toHaveTextContent(
        'Change Pick',
      );
    });
  });
});
