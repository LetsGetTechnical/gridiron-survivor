import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import Week from './Week';
import { getCurrentLeague, createWeeklyPicks } from '@/api/apiFunctions';
import { useDataStore } from '@/store/dataStore';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { toast } from 'react-hot-toast';
import { onWeeklyPickChange } from './WeekHelper';
import { parseUserPick } from '@/utils/utils';
import { IWeeklyPicks } from '@/api/apiFunctions.interface';

jest.mock('@/store/dataStore', () => ({
  useDataStore: jest.fn(() => ({ user: { id: '123', leagues: [] } })),
}));

jest.mock('@/api/apiFunctions', () => ({
  getCurrentLeague: jest.fn(() =>
    Promise.resolve({
      week: 1,
    }),
  ),
  createWeeklyPicks: jest.fn(() =>
    Promise.resolve({
      week: 1,
    }),
  ),
}));

jest.mock('react-hot-toast', () => ({
  toast: {
    custom: jest.fn(),
  },
}));

jest.mock('@/utils/utils', () => ({
  parseUserPick: jest.fn(),
}));

describe('Week', () => {
  const data = {
    target: { value: 'Browns' },
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  };
  const NFLTeams = [{ teamName: 'Browns', teamId: '1234' }];
  const user = { id: '12345', email: 'email@example.com', leagues: [] };
  const entry = 'mockEntry';
  const league = 'mockLeague';
  const week = 'mockWeek';
  const updateWeeklyPicks = jest.fn();
  const setUserPick = jest.fn();

  const weeklyPicks: IWeeklyPicks = {
    leagueId: '123',
    gameWeekId: '123456',
    userResults: {},
  };

  const teamID = NFLTeams[0].teamName;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should display GlobalSpinner while loading data', async () => {
    render(
      <Week entry="entry-id" league="league-id" NFLTeams={NFLTeams} week="1" />,
    );
    await waitFor(() => {
      expect(screen.getByTestId('global-spinner')).toBeInTheDocument();
    });
  });

  test('should not display GlobalSpinner after loading data', async () => {
    getCurrentLeague.mockResolvedValue({ week: 1 });
    createWeeklyPicks.mockResolvedValue({});

    render(
      <Week entry="entry-id" league="league-id" NFLTeams={NFLTeams} week="1" />,
    );

    await waitFor(() => {
      expect(screen.queryByTestId('global-spinner')).not.toBeInTheDocument();
    });
  });

  test('should show success notification after changing your team pick', async () => {
    (createWeeklyPicks as jest.Mock).mockResolvedValue({});
    const currentUserPick = parseUserPick(user.id, entry, teamID);

    await onWeeklyPickChange({
      data,
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
      userResults: {
        ...weeklyPicks.userResults,
        [user.id]: {
          ...weeklyPicks.userResults[user.id],
          [entry]: {
            ...weeklyPicks.userResults[user.id]?.[entry],
            ...currentUserPick[user.id][entry],
          },
        },
      },
    });

    expect(parseUserPick).toHaveBeenCalledWith(user.id, entry, teamID);
    expect(toast.custom).toHaveBeenCalledWith(
      <Alert
        variant={AlertVariants.Success}
        message={`You have successfully picked the ${
          currentUserPick[user.id][entry].teamName
        } for your team!`}
      />,
    );
  });

  test('should show error notification when changing your team fails', async () => {
    (createWeeklyPicks as jest.Mock).mockRejectedValue(new Error('error'));

    await onWeeklyPickChange({
      data,
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
