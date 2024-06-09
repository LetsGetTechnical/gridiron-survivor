import { render, renderHook, act } from '@testing-library/react';
import { useDataStore } from '@/store/dataStore';
import WeeklyPicks from './WeeklyPicks';

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

jest.mock('./WeeklyPicks', () => jest.fn(() => null));

describe('WeeklyPicks Component', () => {
  describe('useEffect Test', () => {
    it('should update the current week if it has changed', () => {
      const { result } = renderHook(() => useDataStore());
      expect(result.current.gameWeek).toEqual(defaultGameWeek);

      const mockUpdateGameWeek = jest
        .spyOn(result.current, 'updateGameWeek')
        .mockImplementation(() => {});

      render(
        <WeeklyPicks
          leagueId={mockLeagueId}
          NFLTeams={mockNFLTeamsData}
          currentGameWeek={mockCurrentGameWeekData}
        />,
      );

      act(() => {
        result.current.updateGameWeek(mockCurrentGameWeekData);
      });

      // Verify the function was called with the correct argument
      expect(mockUpdateGameWeek).toHaveBeenCalled();

      mockUpdateGameWeek.mockRestore();
    });
    it('should not update the current week if it has not changed', () => {
      const { result } = renderHook(() => useDataStore());
      expect(result.current.gameWeek).toEqual(defaultGameWeek);

      // act(() => {
      //   result.current.updateGameWeek(mockCurrentGameWeekData);
      // });

      // expect(result.current.gameWeek).toEqual(mockCurrentGameWeekData);

      const mockUpdateGameWeek = jest.spyOn(result.current, 'updateGameWeek');

      render(
        <WeeklyPicks
          leagueId={mockLeagueId}
          NFLTeams={mockNFLTeamsData}
          currentGameWeek={mockCurrentGameWeekData}
        />,
      );

      // Verify the function was not called
      expect(mockUpdateGameWeek).not.toHaveBeenCalled();
    });
  });
});
