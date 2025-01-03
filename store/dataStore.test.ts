import { renderHook, act } from '@testing-library/react';
import { useDataStore } from './dataStore';

// test values
const userData = {
  documentId: '123',
  id: '123',
  email: 'test@email.com',
  leagues: ['123456'],
  labels: ['admin'],
};

const NFLTeams = [
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
  leagueName: 'Test League',
  logo: 'https://findmylogo.com/logo.png',
  participants: ['123456', '78'],
  survivors: ['123456', '78', '9'],
};

const gameCurrentWeek = {
  id: '1234567890',
  week: 2,
};

const allLeagues = [
  {
    leagueId: '123',
    leagueName: 'Test League',
    logo: 'https://findmylogo.com/logo.png',
    participants: ['123456', '78'],
    survivors: ['123456', '78', '9'],}
];

describe('Data Store', () => {
  describe('User Test', () => {
    it('Check the default user state', () => {
      const { result } = renderHook(() => useDataStore());
      expect(result.current.user.id).toBe('');
      expect(result.current.user.email).toBe('');
      expect(result.current.user.leagues).toStrictEqual([]);
    });
    it('Check the updated user state', () => {
      const { result } = renderHook(() => useDataStore());

      act(() => {
        result.current.updateUser(
          userData.documentId,
          userData.userId,
          userData.userEmail,
          userData.leagues,
          userData.labels,
        );
      });

      expect(result.current.user.id).toBe(userData.userId);
      expect(result.current.user.email).toBe(userData.userEmail);
      expect(result.current.user.labels).toStrictEqual(userData.labels);
      expect(result.current.user.leagues).toStrictEqual(userData.leagues);
    });
    it('Checks the reset user state matches default', () => {
      const { result } = renderHook(() => useDataStore());

      act(() => {
        result.current.updateUser(
          userData.documentId,
          userData.userId,
          userData.userEmail,
          userData.leagues,
          userData.labels,
        );
        result.current.resetUser();
      });

      expect(result.current.user.id).toBe('');
      expect(result.current.user.email).toBe('');
      expect(result.current.user.labels).toStrictEqual([]);
      expect(result.current.user.leagues).toStrictEqual([]);
    });
  });

  describe('NFL Teams Test', () => {
    it('Check the default NFL Teams state', () => {
      const { result } = renderHook(() => useDataStore());
      expect(result.current.NFLTeams).toStrictEqual([]);
    });
    it('Check the updated NFL Teams state', () => {
      const { result } = renderHook(() => useDataStore());

      act(() => {
        result.current.updateNFLTeams(NFLTeams);
      });

      expect(result.current.NFLTeams[0]).toBe(NFLTeams[0]);
      expect(result.current.NFLTeams[1]).toBe(NFLTeams[1]);
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
          '123': {
            '456': {
            'entry1': {
              teamName: 'New England Patriots',
              correct:true
            },
            'entry2': {
              teamName: 'Kansas City Chiefs',
              correct:false
            },
            'entry3': {
              teamName: 'New England Patriots',
              correct:false
            }
          }
          }
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
      expect(result.current.league.leagueName).toBe('');
      expect(result.current.league.logo).toBe('');
      expect(result.current.league.participants).toStrictEqual([]);
      expect(result.current.league.survivors).toStrictEqual([]);
    });
    it('Check the updated league state', () => {
      const { result } = renderHook(() => useDataStore());

      act(() => {
        result.current.updateLeague(league);
      });

      expect(result.current.league.leagueId).toBe(league.leagueId);
      expect(result.current.league.leagueName).toBe(league.leagueName);
      expect(result.current.league.logo).toBe(league.logo);
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

xdescribe('getting all leagues test', () => {
  it('check the default allLeagues state', async () => {
    const { result } = renderHook(() => useDataStore());
    expect(result.current.allLeagues).toStrictEqual([]);
  });
  it('check the updated allLeagues state', async () => {
    const { result } = renderHook(() => useDataStore()); 
    act(() => {
      result.current.updateAllLeagues(allLeagues);
    });
    expect(result.current.allLeagues).toStrictEqual(allLeagues);
  })
})
