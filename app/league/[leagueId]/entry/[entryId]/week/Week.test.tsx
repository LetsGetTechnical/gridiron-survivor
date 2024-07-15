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
  const weeklyPicks = {
    leagueId: 'mockId',
    gameWeekId: 'mockGameId',
    userResults: {},
  };
  const league = 'mockLeague';
  const week = 'mockWeek';
  const updateWeeklyPicks = jest.fn();
  const setUserPick = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should show success notification after changing your team pick', async () => {
    mockCreateWeeklyPicks.mockResolvedValue({});

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
  });
});
