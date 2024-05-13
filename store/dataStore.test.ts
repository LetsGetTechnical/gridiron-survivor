import { renderHook, act } from '@testing-library/react';
import { useDataStore } from './dataStore';

// test values
const userData = {
   userId: '123',
   userEmail: 'test@email.com',
}

const gameData = { 
teamName: "Philadelphia Eagles",
teamLogo: "eagle",
weekNumber: '7',
gameId: "438",
gameWeekId: "7839",
userResults: "Vikings",
}

describe('Data Store', () => {
  it('Check the default user state', () => {
    const { result } = renderHook(() => useDataStore());
    expect(result.current.userData.userId).toBe('');
    expect(result.current.user.email).toBe('');
  });
  it('Check the updated user state', () => {
    const { result } = renderHook(() => useDataStore());

    act(() => {
      result.current.updateUser(userId, userEmail);
    });

    expect(result.current.user.id).toBe(userId);
    expect(result.current.user.email).toBe(userEmail);
  });
  it('Checks the reset user state matches default', () => {
    const { result } = renderHook(() => useDataStore());

    act(() => {
      result.current.updateUser(userId, userEmail);
      result.current.resetUser();
    });

    expect(result.current.user.id).toBe('');
    expect(result.current.user.email).toBe('');
  });
  it('Check the default NFL Teams state', () => {
    const { result } = renderHook(() => useDataStore());
    expect(result.current.NFLTeams.teamName).toBe('');
    expect(result.current.NFLTeams.teamLogo).toBe('');
  });
  it('Check the updated NFL Teams state', () => {
    const { result } = renderHook(() => useDataStore());

    act(() => {
      result.current.updateNFLTeams(teamName, teamLogo);
    });

    expect(result.current.NFLTeams.teamName).toBe(teamName);
    expect(result.current.NFLTeams.teamLogo).toBe(teamLogo);
  });
  it('Check the default userWeeklyPick state', () => {
    const { result } = renderHook(() => useDataStore());
    expect(result.current.user.id).toBe('');
    expect(result.current.userWeeklyPick.weekNumber).toBe('');
  });
  it('Check the updated userWeeklyPick state', () => {
    const { result } = renderHook(() => useDataStore());

    act(() => {
      result.current.updateUserWeeklyPick(userId, weekNumber);
    });

    expect(result.current.user.id).toBe(userId);
    expect(result.current.userWeeklyPick.weekNumber).toBe(weekNumber);
  });
  it('Check the default updateWeeklyPicks state', () => {
    const { result } = renderHook(() => useDataStore());
    expect(result.current.weeklyPicks.gameId).toBe('');
    expect(result.current.weeklyPicks.gameWeekId).toBe('');
    expect(result.current.weeklyPicks.userResults).toBe('');
  });
  it('Check the updated updateWeeklyPicks state', () => {
    const { result } = renderHook(() => useDataStore());

    act(() => {
      result.current.updateWeeklyPicks(gameId, gameWeekId, userResults);
    });

    expect(result.current.weeklyPicks.gameId).toBe(gameId);
    expect(result.current.weeklyPicks.gameWeekId).toBe(gameWeekId);
    expect(result.current.weeklyPicks.userResults).toBe(userResults);
  });
});
