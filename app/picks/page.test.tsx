import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { getNFLTeams, getGameWeek } from '@/api/apiFunctions';
import Picks from './page';
import WeeklyPicks from './WeeklyPicks';

const mockLeagueId = '123456';
const mockNFLTeamsData = [
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
const mockCurrentGameWeekData = {
  id: '1234567890',
  week: 2,
};

jest.mock('../../api/apiFunctions', () => ({
  getNFLTeams: jest.fn(() => Promise.resolve(mockNFLTeamsData)),
  getGameWeek: jest.fn(() => Promise.resolve(mockCurrentGameWeekData)),
}));

jest.mock('./WeeklyPicks', () => jest.fn(() => null));

describe('Picks', () => {
  it('calls WeeklyPicks component with correct props', async () => {
    const jsx = await Picks({ searchParams: { leagueId: mockLeagueId } });

    expect(jsx.props.leagueId).toBe(mockLeagueId);
    expect(getNFLTeams).toHaveBeenCalled();
    expect(getGameWeek).toHaveBeenCalled();
    expect(jsx.props.NFLTeams).toEqual(mockNFLTeamsData);
    expect(jsx.props.currentGameWeek).toEqual(mockCurrentGameWeekData);
    expect(WeeklyPicks).toHaveBeenCalled();
    
  });
});
