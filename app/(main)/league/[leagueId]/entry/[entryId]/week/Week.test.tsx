import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Week from './Week';
import { getCurrentLeague, createWeeklyPicks } from '@/api/apiFunctions';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { toast } from 'react-hot-toast';
import { onWeeklyPickChange } from './WeekHelper';
import { parseUserPick } from '@/utils/utils';
import { IWeeklyPicks } from '@/api/apiFunctions.interface';

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
    getState: jest.fn(() => ({
      currentWeek: 1,
    })),
    user: { id: '123', leagues: [] },
    updateWeeklyPicks: jest.fn(),
    updateCurrentWeek: jest.fn(),
    weeklyPicks: {},
  })),
}));

jest.mock('@/api/apiFunctions', () => ({
  getCurrentLeague: jest.fn(() =>
    Promise.resolve({
      week: 1,
    }),
  ),
  getCurrentUserEntries: jest.fn(() =>
    Promise.resolve([
      {
        $id: '123',
        name: 'Entry 1',
        user: '123',
        league: '123',
        selectedTeams: ['Packers', 'Browns'],
        eliminated: false,
      },
    ]),
  ),
  getGameWeek: jest.fn(() =>
    Promise.resolve({
      week: 1,
    }),
  ),
  createWeeklyPicks: jest.fn(),
  getAllWeeklyPicks: jest.fn(),
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

describe('Week', () => {
  const teamSelect = 'Browns';
  const NFLTeams = [
    {
      teamId: 'browns',
      teamName: 'Browns',
      teamLogo: 'https://example.com/logo-1.png',
    },
    {
      teamId: 'packers',
      teamName: 'Packers',
      teamLogo: 'https://example.com/logo-2.png',
    },
  ];
  const user = { id: '123', email: 'email@example.com', leagues: ['123'] };
  const entry = '123';
  const league = '123';
  const week = '1';
  const setUserPick = jest.fn();
  const updateWeeklyPicks = jest.fn();
  const mockGetCurrentLeague = getCurrentLeague as jest.Mock;
  const mockCreateWeeklyPicks = createWeeklyPicks as jest.Mock;

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

  test('should display GlobalSpinner while loading data', async () => {
    mockUseAuthContext.isSignedIn = true;

    render(
      <Week entry={entry} league={league} NFLTeams={NFLTeams} week={week} />,
    );

    await waitFor(() => {
      expect(screen.getByTestId('global-spinner')).toBeInTheDocument();
    });
  });

  test('should display main content after data is loaded and hide GlobalSpinner', async () => {
    mockUseAuthContext.isSignedIn = true;

    render(
      <Week entry={entry} league={league} NFLTeams={NFLTeams} week={week} />,
    );

    // Wait for the main content to be displayed
    await waitFor(
      () => {
        expect(screen.getByTestId('weekly-picks')).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    // Ensure the GlobalSpinner is not present when main content is loaded
    expect(screen.queryByTestId('global-spinner')).not.toBeInTheDocument();
  });

  xtest('should show success notification after changing your team pick', async () => {
    (createWeeklyPicks as jest.Mock).mockResolvedValue({});

    const currentUserPick = mockParseUserPick(user.id, entry, teamID);

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

    expect(mockParseUserPick).toHaveBeenCalledWith(user.id, entry, teamID);

    expect(toast.custom).toHaveBeenCalledWith(
      <Alert
        variant={AlertVariants.Success}
        message={`You have successfully pick the ${
          currentUserPick[user.id][entry].teamName
        } for your team!`}
      />,
    );
  });

  xtest('should show error notification when changing your team fails', async () => {
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

  test('should redirect back to entry page after successfully selecting a team', async () => {
    mockUseAuthContext.isSignedIn = true;

    render(
      <Week entry={entry} league={league} NFLTeams={NFLTeams} week={week} />,
    );

    await waitFor(
      () => {
        expect(screen.getByTestId('weekly-picks')).toBeInTheDocument();
      },
      { timeout: 5000 },
    );

    const teamRadios = await screen.findAllByTestId('team-radio');
    fireEvent.click(teamRadios[0]);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(`/league/${league}/entry/all`);
    });
  });
});
