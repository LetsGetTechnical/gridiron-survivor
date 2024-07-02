import { mock } from 'node:test';
import { getGameData, getUserPick } from './utils';
import { getCurrentLeague, getAllWeeklyPicks } from '@/api/apiFunctions';

// Mock only the dependencies, not the function under test
jest.mock('../api/apiFunctions', () => ({
  getCurrentLeague: jest.fn(),
  getAllWeeklyPicks: jest.fn(),
}));

// test data
const mockUserData = {
  userId: '66281d5ec5614f76bc91',
  userEmail: 'test@email.com',
  leagues: ['123'],
};

const mockNFLTeams = [
  {
    teamId: '66218f22b40deef340f8',
    teamName: 'New England Patriots',
    teamLogo: 'https://www.nfl.com/teams/new-england-patriots/logo',
  },
  {
    teamId: '2',
    teamName: 'Kansas City Chiefs',
    teamLogo: 'https://www.nfl.com/teams/kansas-city-chiefs/logo',
  },
];

const mockLeague = {
  leagueId: '123',
  leagueName: 'Test League',
  logo: 'https://findmylogo.com/logo.png',
  participants: ['123456', '78'],
  survivors: ['123456', '78', '9'],
};

const mockGameCurrentWeek = {
  id: '1234567890',
  week: 2,
};

const mockWeeklyPicksData = {
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
};

describe('utils', () => {
  describe('getGameData', () => {
    it('should return the league and weekly picks data', async () => {
      (getCurrentLeague as jest.Mock).mockResolvedValue(mockLeague);
      (getAllWeeklyPicks as jest.Mock).mockResolvedValue(mockWeeklyPicksData);

      const result = await getGameData({
        leagueId: mockLeague.leagueId,
        currentGameWeekId: mockGameCurrentWeek.id,
      });

      expect(getCurrentLeague).toHaveBeenCalledWith(mockLeague.leagueId);
      expect(getAllWeeklyPicks).toHaveBeenCalledWith({
        leagueId: mockLeague.leagueId,
        weekId: mockGameCurrentWeek.id,
      });
      expect(result).toEqual({
        league: mockLeague,
        weeklyPicksData: {
          leagueId: mockLeague.leagueId,
          gameWeekId: mockGameCurrentWeek.id,
          userResults: mockWeeklyPicksData,
        },
      });
    });
  });
  describe('getUserPick', () => {
    it("should return the user's team name if the user has a pick", async () => {
      const result = await getUserPick({
        weeklyPicks: mockWeeklyPicksData,
        userId: mockUserData.userId,
        NFLTeams: mockNFLTeams,
      });

      expect(result).toBe(mockNFLTeams[0].teamName);
    });

    it('should return an empty string if the user has no pick for the given week', async () => {
      const result = await getUserPick({
        weeklyPicks: {},
        userId: mockUserData.userId,
        NFLTeams: mockNFLTeams,
      });

      expect(result).toBe('');
    });

    it("should return an empty string if the user's team id does not match any team", async () => {
      const result = await getUserPick({
        weeklyPicks: {
          '66281d5ec5614f76bc91': {
            team: '321',
            correct: false,
          },
        },
        userId: mockUserData.userId,
        NFLTeams: mockNFLTeams,
      });
      expect(result).toBe('');
    });

    it('should return an empty string if there are no weekly picks', async () => {
      const result = await getUserPick({
        weeklyPicks: null,
        userId: mockUserData.userId,
        NFLTeams: mockNFLTeams,
      });
      expect(result).toBe('');
    });
  });
});
