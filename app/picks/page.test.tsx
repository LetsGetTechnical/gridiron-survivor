import { render } from '@testing-library/react';
import Page from './page';
import { getNFLTeams, getGameWeek } from '@/api/apiFunctions';

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

let leagueId: string = mockLeagueId;

jest.mock('../../api/apiFunctions', () => ({
  getNFLTeams: jest.fn(() => Promise.resolve(mockNFLTeamsData)),
  getGameWeek: jest.fn(() => Promise.resolve(mockCurrentGameWeekData)),
}));

describe('Page', () => {
  it('renders WeeklyPicks component with correct props', async () => {
    render(await Page({ searchParams: { leagueId: mockLeagueId } }));

    expect(leagueId).toBe(mockLeagueId);
    expect(getNFLTeams).toHaveBeenCalled();
    expect(getGameWeek).toHaveBeenCalled();
  });
});
