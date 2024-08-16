import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Week from './Week';
import {
  getCurrentLeague,
  getCurrentUserEntries,
  createWeeklyPicks,
  getAllWeeklyPicks,
} from '@/api/apiFunctions';
import { useDataStore } from '@/store/dataStore';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { toast } from 'react-hot-toast';
import { onWeeklyPickChange } from './WeekHelper';
import { parseUserPick } from '@/utils/utils';
import { IWeeklyPicks } from '@/api/apiFunctions.interface';

jest.mock('@/store/dataStore', () => ({
  useDataStore: jest.fn(() => ({
    user: { id: '123', leagues: [] },
    weeklyPicks: {},
    updateWeeklyPicks: jest.fn(),
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
        id: '123',
        week: 1,
        selectedTeams: [],
      },
    ]),
  ),
  createWeeklyPicks: jest.fn(),
  getAllWeeklyPicks: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  toast: {
    custom: jest.fn(),
  },
}));

describe('Week', () => {
  const data = {
    target: { value: 'Browns' },
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  };
  const NFLTeams = [{ teamName: 'Browns', teamId: '1234', teamLogo: 'browns' }];
  const user = { id: '12345', email: 'email@example.com', leagues: [] };
  const entry = 'mockEntry';
  const league = 'mockLeague';
  const week = 'mockWeek';
  const updateWeeklyPicks = jest.fn();
  const setUserPick = jest.fn();
  const mockGetCurrentLeague = getCurrentLeague as jest.Mock;
  const mockCreateWeeklyPicks = createWeeklyPicks as jest.Mock;

  const weeklyPicks: IWeeklyPicks = {
    leagueId: '123',
    gameWeekId: '123456',
    userResults: {},
  };

  const teamID = NFLTeams[0].teamName;

  const updatedWeeklyPicks = {
    ...weeklyPicks.userResults,
    [user.id]: {
      ...weeklyPicks.userResults[user.id],
      [entry]: {
        ...weeklyPicks.userResults[user.id]?.[entry],
        ...parseUserPick(user.id, entry, teamID || '')[user.id][entry],
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
    render(
      <Week entry={entry} league={league} NFLTeams={NFLTeams} week={week} />,
    );
    await waitFor(() => {
      expect(screen.getByTestId('global-spinner')).toBeInTheDocument();
    });
  });

  test('should not display GlobalSpinner after loading data', async () => {
    mockGetCurrentLeague.mockResolvedValue({
      week: 1,
    });
    mockCreateWeeklyPicks.mockResolvedValue({});

    render(
      <Week entry={entry} league={league} NFLTeams={NFLTeams} week={week} />,
    );
    await waitFor(() => {
      expect(screen.queryByTestId('global-spinner')).not.toBeInTheDocument();
    });
  });

  test('should show success notification after changing your team pick', async () => {
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

  test('should show error notification when changing your team fails', async () => {
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
});
