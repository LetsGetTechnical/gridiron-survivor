import { renderHook } from '@testing-library/react';
import useProcessGame from './useProcessGame';
import * as utils from './utils';
import * as dataStore from '@/store/dataStore';

// Mock the utility functions and store hooks
jest.mock('./utils', () => ({
  getGameData: jest.fn(),
  getUserPick: jest.fn(),
}));

jest.mock('../store/dataStore', () => ({
  useDataStore: jest.fn(),
}));

// test values
const mockUserData = {
  id: '123',
  email: 'test@email.com',
  leagues: ['123456'],
};

const mockNFLTeams = [
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

const mockLeague = {
  leagueId: '123',
  leagueName: 'Test League',
  logo: 'https://findmylogo.com/logo.png',
  participants: ['123456', '78'],
  survivors: ['123456', '78', '9'],
};

const mockGameWeek = {
  id: '1234567890',
  week: 2,
};

describe('useProcessGame', () => {
  it('should call getGameData with correct params', () => {
    renderHook(() =>
      useProcessGame({
        leagueId: mockLeague.leagueId,
        gameWeek: mockGameWeek,
        user: mockUserData,
        NFLTeams: mockNFLTeams,
        setUserPick: jest.fn(),
      }),
    );

    expect(utils.getGameData).toHaveBeenCalledWith({
      leagueId: '123',
      currentGameWeekId: 'week1',
    });
  });
});
