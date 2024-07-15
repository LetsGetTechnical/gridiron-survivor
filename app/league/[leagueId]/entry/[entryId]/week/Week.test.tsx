import React from 'react';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { toast } from 'react-hot-toast';
import { onWeeklyPickChange } from './WeekHelper';

const mockCreateWeeklyPicks = jest.fn();
const mockParseUserPick = jest.fn();

jest.mock('@/api/apiFunctions', () => ({
  createWeeklyPicks: mockCreateWeeklyPicks,
}));

jest.mock('react-hot-toast', () => ({
  toast: {
    custom: jest.fn(),
  },
}));

jest.mock('@/utils/utils', () => ({
  parseUserPick: mockParseUserPick,
}));

describe('Week', () => {
  const data = {
    target: { value: 'mockTeam' },
    preventDefault: jest.fn(),
    stopPropagation: jest.fn(),
  };
  const NFLTeams = [{ teamName: 'mockTeam', teamId: 'mockId' }];
  const user = { id: 'mockUserId', email: 'email@example.com', leagues: [] };
  const entry = 'mockEntry';
  const league = 'mockLeague';
  const week = 'mockWeek';
  const updateWeeklyPicks = jest.fn();
  const setUserPick = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should show success notification after changing your team pick', async () => {
    mockCreateWeeklyPicks.mockResolvedValue({});

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
          ...mockParseUserPick(user.id, entry, teamID || '')[user.id][entry],
        },
      },
    };

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

    expect(mockCreateWeeklyPicks).toHaveBeenCalledWith({
      leagueId: league,
      gameWeekId: week,
      userResults: updatedWeeklyPicks,
    });

    expect(mockParseUserPick).toHaveBeenCalledWith(
      user.id,
      entry,
      teamID || '',
    );

    expect(toast.custom).toHaveBeenCalledWith(
      <Alert
        variant={AlertVariants.Success}
        message="You've successfully picked your team!"
      />,
    );
  });
});
