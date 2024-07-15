import React from 'react';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { toast } from 'react-hot-toast';
import { onWeeklyPickChange } from './WeekHelper';
import { createWeeklyPicks } from '../../../../../../api/apiFunctions';
import { parseUserPick } from '../../../../../../utils/utils';

jest.mock('../../../../../../api/apiFunctions', () => ({
  createWeeklyPicks: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  toast: {
    custom: jest.fn(),
  },
}));

jest.mock('../../../../../../utils/utils', () => ({
  parseUserPick: jest.fn().mockReturnValue({
    mockUserId: {
      mockEntry: {},
    },
  }),
}));

describe('Week', () => {
  const data = {
    target: { value: 'mockTeam' },
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  } as any;
  const NFLTeams = [{ teamName: 'mockTeam', teamId: 'mockId' }];
  const user = { id: 'mockUserId', email: 'email@example.com', leagues: [] };
  const entry = 'mockEntry';
  const league = 'mockLeague';
  const week = 'mockWeek';
  const updateWeeklyPicks = jest.fn();
  const setUserPick = jest.fn();
  interface IUserResults {
    [key: string]: any; // Adjust the 'any' to match the structure of your user results
  }

  interface IWeeklyPicks {
    leagueId: string;
    gameWeekId: string;
    userResults: IUserResults;
  }

  const weeklyPicks: IWeeklyPicks = {
    leagueId: 'mockId',
    gameWeekId: 'mockGameId',
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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should show success notification after changing your team pick', async () => {
    (createWeeklyPicks as jest.Mock).mockResolvedValue({});

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

    expect(parseUserPick).toHaveBeenCalledWith(user.id, entry, teamID || '');

    expect(toast.custom).toHaveBeenCalledWith(
      <Alert
        variant={AlertVariants.Success}
        message="You've successfully picked your team!"
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
