import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import WeeklyPicks from './WeeklyPicks'; // Adjust the import path accordingly
import { useDataStore } from '../../store/dataStore';

const mockLeagueId = '123456';
const mockNFLTeamsData = [
  {
    $id: '1',
    teamName: 'New England Patriots',
    teamLogo: 'https://www.nfl.com/teams/new-england-patriots/logo',
  },
  {
    $id: '2',
    teamName: 'Kansas City Chiefs',
    teamLogo: 'https://www.nfl.com/teams/kansas-city-chiefs/logo',
  },
];
const mockCurrentGameWeekData = {
  id: '1234567890',
  week: 2,
};
const defaultGameWeek = {
  id: '',
  week: 0,
};

// Mock the Zustand store within the jest.mock call
jest.mock('../../store/dataStore', () => {
  const actualCreate = jest.requireActual('zustand').create;

  // Create a mock store
  const useDataStore = actualCreate(() => ({
    user: { id: '', email: '', league: [] },
    updateWeeklyPicks: jest.fn(),
    weeklyPicks: { leagueId: '', gameWeekId: '', userResults: {} },
    gameWeek: { week: 0, id: '' },
    updateGameWeek: jest.fn(),
    updateNFLTeam: jest.fn(),
    NFLTeam: [],
  }));

  return { useDataStore };
});

// Mock the useProcessGame hook
jest.mock('../../utils/useProcessGame', () => jest.fn());

const useProcessGame = jest.fn();
jest.mock(`../../utils/useProcessGame`);

describe('WeeklyPicks Component', () => {
  it('calls updateGameWeek when gameWeek changes', () => {
    const mockUpdateGameWeek = jest.fn();
    const mockProcessGame = jest.fn();
    useProcessGame.mockReturnValue(mockProcessGame);

    // Set the initial state
    useDataStore.setState({
      user: { id: '', email: '', league: [] },
      updateWeeklyPicks: jest.fn(),
      weeklyPicks: { leagueId: '', gameWeekId: '', userResults: {} },
      gameWeek: defaultGameWeek,
      updateGameWeek: mockUpdateGameWeek,
      updateNFLTeam: jest.fn(),
      NFLTeam: [],
    });

    render(
      <WeeklyPicks
        NFLTeams={mockNFLTeamsData}
        currentGameWeek={mockCurrentGameWeekData}
        leagueId={mockLeagueId}
      />,
    );

    expect(mockUpdateGameWeek).toHaveBeenCalledWith(mockCurrentGameWeekData);
    expect(mockProcessGame).not.toHaveBeenCalled();
  });

  it('Does not call updateGameWeek', () => {
    const mockUpdateGameWeek = jest.fn();
    const mockProcessGame = jest.fn();
    useProcessGame.mockReturnValue(mockProcessGame);

    // Set the initial state
    useDataStore.setState({
      user: { id: '', email: '', league: [] },
      updateWeeklyPicks: jest.fn(),
      weeklyPicks: { leagueId: '', gameWeekId: '', userResults: {} },
      gameWeek: mockCurrentGameWeekData,
      updateGameWeek: mockUpdateGameWeek,
      updateNFLTeam: jest.fn(),
      NFLTeam: [],
    });

    render(
      <WeeklyPicks
        NFLTeams={mockNFLTeamsData}
        currentGameWeek={mockCurrentGameWeekData}
        leagueId={mockLeagueId}
      />,
    );

    expect(mockUpdateGameWeek).not.toHaveBeenCalled();
    expect(mockProcessGame).not.toHaveBeenCalled();
  });
});
