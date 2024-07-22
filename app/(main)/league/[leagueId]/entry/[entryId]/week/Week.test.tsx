import React from 'react';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { toast } from 'react-hot-toast';
import { onWeeklyPickChange } from './WeekHelper';
import { createWeeklyPicks } from '@/api/apiFunctions';
import { parseUserPick } from '@/utils/utils';
import { IWeeklyPicks } from '@/api/apiFunctions.interface';

jest.mock('@/api/apiFunctions', () => ({
  createWeeklyPicks: jest.fn(),
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

  test('should show success notification after changing your team pick', async () => {
    (createWeeklyPicks as jest.Mock).mockResolvedValue({});

    const currentUserPick = mockParseUserPick(user.id, entry, teamID);

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
