import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Week from './Week';
import { createWeeklyPicks, getCurrentUserEntries } from '@/api/apiFunctions';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { toast } from 'react-hot-toast';
import { onWeeklyPickChange } from './WeekHelper';
import { getNFLTeamLogo, parseUserPick } from '@/utils/utils';
import { INFLTeam, IWeeklyPicks } from '@/api/apiFunctions.interface';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      push: mockPush,
    };
  },
}));

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
    currentWeek: 1,
    user: { id: '123', email: 'email@example.com', leagues: ['123'] },
    weeklyPicks: {},
    updateWeeklyPicks: jest.fn(),
    updateCurrentWeek: jest.fn(),
  })),
}));

jest.mock('@/api/apiFunctions', () => ({
  getCurrentLeague: jest.fn(() =>
    Promise.resolve({
      week: 1,
    }),
  ),
  getGameWeek: jest.fn(() =>
    Promise.resolve({
      week: 1,
    }),
  ),
  createWeeklyPicks: jest.fn(),
  getAllWeeklyPicks: jest.fn(),
  getCurrentUserEntries: jest.fn(),
}));

jest.mock('@/utils/utils', () => {
  const actualUtils = jest.requireActual('@/utils/utils');
  return {
    ...actualUtils,
    hasTeamBeenPicked: jest.fn(),
    getNFLTeamLogo: jest.fn(),
  };
});

jest.mock('react-hot-toast', () => ({
  toast: {
    custom: jest.fn(),
  },
}));

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

const teamSelect = 'Browns';
const NFLTeams = [
  {
    teamId: 'browns',
    teamName: 'Browns',
    teamLogo: 'https://example.com/browns.png',
  },
  {
    teamId: 'packers',
    teamName: 'Packers',
    teamLogo: 'https://example.com/packers.png',
  },
];
const user = {
  documentId: 'mockDocument',
  id: '123',
  email: 'email@example.com',
  leagues: ['123'],
};
const entry = '123';
const league = '123';
const week = '1';
const weeklyPicks: IWeeklyPicks = {
  leagueId: '123',
  gameWeekId: '123456',
  userResults: {},
};

const teamName = NFLTeams[0].teamName;

const updatedWeeklyPicks = {
  ...weeklyPicks.userResults,
  [user.id]: {
    ...weeklyPicks.userResults[user.id],
    [entry]: {
      ...weeklyPicks.userResults[user.id]?.[entry],
      ...parseUserPick(user.id, entry, teamName || '')[user.id][entry],
    },
  },
};

describe('League Week Picks', () => {
  const setUserPick = jest.fn();
  const updateWeeklyPicks = jest.fn();
  const mockGetNFLTeamLogo = getNFLTeamLogo as jest.Mock;
  mockGetNFLTeamLogo.mockImplementation((teams, teamName) => {
    const team = teams.find((team: INFLTeam) => team.teamName === teamName);
    return team ? team.teamLogo : '';
  });

  const mockParseUserPick = jest.fn().mockReturnValue({
    [user.id]: {
      [entry]: {
        teamName: 'Browns',
      },
    },
  });

  jest.mock('@/utils/utils', () => ({
    parseUserPick: mockParseUserPick,
  }));

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display GlobalSpinner while loading data', async () => {
    mockUseAuthContext.isSignedIn = true;
    (getCurrentUserEntries as jest.Mock).mockResolvedValue([
      {
        $id: '123',
        name: 'Entry 1',
        user: '123',
        league: '123',
        selectedTeams: [],
        eliminated: false,
      },
    ]);

    render(
      <Week entry={entry} league={league} NFLTeams={NFLTeams} week={week} />,
    );

    await waitFor(() => {
      expect(screen.getByTestId('global-spinner')).toBeInTheDocument();
    });
  });

  it('should display main content after data is loaded and hide GlobalSpinner', async () => {
    mockUseAuthContext.isSignedIn = true;
    (getCurrentUserEntries as jest.Mock).mockResolvedValue([
      {
        $id: '123',
        name: 'Entry 1',
        user: '123',
        league: '123',
        selectedTeams: [],
        eliminated: false,
      },
    ]);

    render(
      <Week entry={entry} league={league} NFLTeams={NFLTeams} week={week} />,
    );

    // Wait for the main content to be displayed
    await waitFor(() => {
      expect(screen.getByTestId('weekly-picks')).toBeInTheDocument();
      expect(screen.getByTestId('week__entry-name')).toHaveTextContent('Entry 1');
    });

    expect(screen.queryByTestId('global-spinner')).not.toBeInTheDocument();
  });

  it('should not show previous weeks picks if there is no history of selected teams', async () => {
    mockUseAuthContext.isSignedIn = true;
    (getCurrentUserEntries as jest.Mock).mockResolvedValue([
      {
        $id: '123',
        name: 'Entry 1',
        user: '123',
        league: '123',
        selectedTeams: [],
        eliminated: false,
      },
    ]);

    render(
      <Week entry={entry} league={league} NFLTeams={NFLTeams} week={week} />,
    );

    await waitFor(() => {
      expect(screen.getByTestId('weekly-picks')).toBeInTheDocument();
    });

    expect(screen.queryByTestId('user-pick-history')).not.toBeInTheDocument();
  });

  it('should show previous weeks picks if their are picks in selected teams history', async () => {
    mockUseAuthContext.isSignedIn = true;
    const mockWeek = '2';
    (getCurrentUserEntries as jest.Mock).mockResolvedValue([
      {
        $id: '123',
        name: 'Entry 1',
        user: '123',
        league: '123',
        selectedTeams: ['Packers', 'Browns'],
        eliminated: false,
      },
    ]);

    render(
      <Week
        entry={entry}
        league={league}
        NFLTeams={NFLTeams}
        week={mockWeek}
      />,
    );

    await waitFor(() => {
      expect(screen.getByTestId('weekly-picks')).toBeInTheDocument();
    });

    expect(screen.getByTestId('user-pick-history')).toBeInTheDocument();

    const userPickHistoryLogos = screen.queryAllByTestId('league-history-logo');
    expect(userPickHistoryLogos).toHaveLength(2);
    expect(userPickHistoryLogos[0]).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Fexample.com%2Fpackers.png&w=128&q=75',
    );
    expect(userPickHistoryLogos[1]).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Fexample.com%2Fbrowns.png&w=128&q=75',
    );
  });
  it('should show previous week pick as no pick if there is no history of selected teams', async () => {
    mockUseAuthContext.isSignedIn = true;
    const mockWeek = '2';
    (getCurrentUserEntries as jest.Mock).mockResolvedValue([
      {
        $id: '123',
        name: 'Entry 1',
        user: '123',
        league: '123',
        selectedTeams: ['', 'Browns'],
        eliminated: false,
      },
    ]);

    render(
      <Week
        entry={entry}
        league={league}
        NFLTeams={NFLTeams}
        week={mockWeek}
      />,
    );

    await waitFor(() => {
      expect(screen.getByTestId('weekly-picks')).toBeInTheDocument();
    });

    expect(screen.getByTestId('user-pick-history')).toBeInTheDocument();
    expect(screen.getByTestId('user-pick-history')).toHaveTextContent(
      'No Pick',
    );

    expect(screen.getByTestId('no-pick')).toBeInTheDocument();
    const userPickHistoryLogos = screen.queryAllByTestId('league-history-logo');
    expect(userPickHistoryLogos).toHaveLength(1);
    expect(userPickHistoryLogos[0]).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Fexample.com%2Fbrowns.png&w=128&q=75',
    );
  });

  xit('should show success notification after changing your team pick', async () => {
    (createWeeklyPicks as jest.Mock).mockResolvedValue({});

    const currentUserPick = mockParseUserPick(user.id, entry, teamName);

    await onWeeklyPickChange({
      teamSelect,
      NFLTeams,
      user,
      entry,
      weeklyPicks,
      league,
      week,
      updateWeeklyPicks,
      setUserPick,
    });

    expect(createWeeklyPicks).toHaveBeenCalledWith({
      leagueId: league,
      gameWeekId: week,
      userResults: updatedWeeklyPicks,
    });

    expect(mockParseUserPick).toHaveBeenCalledWith(user.id, entry, teamName);

    expect(toast.custom).toHaveBeenCalledWith(
      <Alert
        variant={AlertVariants.Success}
        message={`You have successfully pick the ${
          currentUserPick[user.id][entry].teamName
        } for your team!`}
      />,
    );
  });

  xit('should show error notification when changing your team fails', async () => {
    (createWeeklyPicks as jest.Mock).mockRejectedValue(new Error('error'));

    await onWeeklyPickChange({
      teamSelect,
      NFLTeams,
      user,
      entry,
      weeklyPicks,
      league,
      week,
      updateWeeklyPicks,
      setUserPick,
    });

    expect(toast.custom).toHaveBeenCalledWith(
      <Alert
        variant={AlertVariants.Error}
        message="There was an error processing your request."
      />,
    );
  });

  xit('should redirect back to entry page after successfully selecting a team', async () => {
    mockUseAuthContext.isSignedIn = true;
    (getCurrentUserEntries as jest.Mock).mockResolvedValue([
      {
        $id: '123',
        name: 'Entry 1',
        user: '123',
        league: '123',
        selectedTeams: [],
        eliminated: false,
      },
    ]);

    render(
      <Week entry={entry} league={league} NFLTeams={NFLTeams} week={week} />,
    );

    const teamRadios = await screen.findAllByTestId('team-radio');
    fireEvent.click(teamRadios[0]);

    await waitFor(() => {
      expect(screen.getByTestId('weekly-picks')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(`/league/${league}/entry/all`);
    });
  });
});
