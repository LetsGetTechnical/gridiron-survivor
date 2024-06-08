import { renderHook, act } from '@testing-library/react';
import { useDataStore } from './dataStore';

// test values
const userData = {
  userId: '123',
  userEmail: 'test@email.com',
  league: ['123456'],
};

const NFLTeam = [
  {
    teamId: '1',
    teamName: 'New England Patriots',
    teamLogo: 'https://www.nfl.com/teams/new-england-patriots/logo',
  },
  {
    teamId: '2',
    teamName: 'Kansas City Chiefs',
    teamLogo: 'https://www.nfl.com/teams/kansas-city-chiefs/logo',
  },
];

const league = {
  leagueId: '123',
  participants: ['123456', '78'],
  survivors: ['123456', '78', '9'],
};

const gameCurrentWeek = {
  id: '1234567890',
  week: 2,
};

describe('Data Store', () => {
  describe('User Test', () => {
    it('Check the default user state', () => {
      const { result } = renderHook(() => useDataStore());
      expect(result.current.user.id).toBe('');
      expect(result.current.user.email).toBe('');
      expect(result.current.user.league).toStrictEqual([]);
    });
    it('Check the updated user state', () => {
      const { result } = renderHook(() => useDataStore());

      act(() => {
        result.current.updateUser(
          userData.userId,
          userData.userEmail,
          userData.league,
        );
      });

      expect(result.current.user.id).toBe(userData.userId);
      expect(result.current.user.email).toBe(userData.userEmail);
    });
    it('Checks the reset user state matches default', () => {
      const { result } = renderHook(() => useDataStore());

      act(() => {
        result.current.updateUser(
          userData.userId,
          userData.userEmail,
          userData.league,
        );
        result.current.resetUser();
      });

      expect(result.current.user.id).toBe('');
      expect(result.current.user.email).toBe('');
    });
  });

  describe('NFL Teams Test', () => {
    it('Check the default NFL Teams state', () => {
      const { result } = renderHook(() => useDataStore());
      expect(result.current.NFLTeam).toStrictEqual([]);
    });
    it('Check the updated NFL Teams state', () => {
      const { result } = renderHook(() => useDataStore());

      act(() => {
        result.current.updateNFLTeam(NFLTeam);
      });

      expect(result.current.NFLTeam[0]).toBe(NFLTeam[0]);
      expect(result.current.NFLTeam[1]).toBe(NFLTeam[1]);
    });
  });

  describe('Weekly Picks Test', () => {
    it('Check the default weeklyPicks state', () => {
      const { result } = renderHook(() => useDataStore());
      expect(result.current.weeklyPicks.leagueId).toBe('');
      expect(result.current.weeklyPicks.gameWeekId).toBe('');
      expect(result.current.weeklyPicks.userResults).toStrictEqual({});
    });
    it('Check the updated weeklyPick state', () => {
      const { result } = renderHook(() => useDataStore());
      const weekData = {
        leagueId: '123',
        gameWeekId: '456',
        userResults: {
          '66281d5ec5614f76bc91': {
            team: '66218f22b40deef340f8',
            correct: false,
          },
          '6628077faeeedd272637': {
            team: '6621b30ea57bd075e9d3',
            correct: false,
          },
          '66174f2362ec891167be': {
            team: '6621b30ea57bd075e9d3',
            correct: true,
          },
        },
      };
      act(() => {
        result.current.updateWeeklyPicks(weekData);
      });

      expect(result.current.weeklyPicks.leagueId).toBe(weekData.leagueId);
      expect(result.current.weeklyPicks.gameWeekId).toBe(weekData.gameWeekId);
      expect(result.current.weeklyPicks.userResults).toBe(weekData.userResults);
    });
  });

  describe('League Test', () => {
    it('Check the default league state', () => {
      const { result } = renderHook(() => useDataStore());
      expect(result.current.league.leagueId).toBe('');
      expect(result.current.league.participants).toStrictEqual([]);
      expect(result.current.league.survivors).toStrictEqual([]);
    });
    it('Check the updated league state', () => {
      const { result } = renderHook(() => useDataStore());

      act(() => {
        result.current.updateLeague(league);
      });

      expect(result.current.league.leagueId).toBe(league.leagueId);
      expect(result.current.league.participants).toBe(league.participants);
      expect(result.current.league.survivors).toBe(league.survivors);
    });
  });

  describe('Game Current Week Test', () => {
    it('Check the default gameCurrentWeek state', () => {
      const { result } = renderHook(() => useDataStore());
      expect(result.current.gameWeek.id).toBe('');
      expect(result.current.gameWeek.week).toBe(0);
    });
    it('Check the updated gameCurrentWeek state', () => {
      const { result } = renderHook(() => useDataStore());

      act(() => {
        result.current.updateGameWeek(gameCurrentWeek);
      });

      expect(result.current.gameWeek.id).toBe(gameCurrentWeek.id);
      expect(result.current.gameWeek.week).toBe(gameCurrentWeek.week);
    });
  });
});
