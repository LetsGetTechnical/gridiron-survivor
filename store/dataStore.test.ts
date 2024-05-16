import { renderHook, act } from '@testing-library/react';
import { useDataStore } from './dataStore';

// test values
const userData = {
  userId: '123',
  userEmail: 'test@email.com',
};

const gameData = {
  teamName: 'Philadelphia Eagles',
  teamLogo: 'eagle',
  weekNumber: '7',
  gameId: '438', 
  gameWeekId: '7839',
  userResults: 'Vikings',
};

describe('Data Store', () => {
  it('Check the default user state', () => {
    const { result } = renderHook(() => useDataStore());
    expect(result.current.user.id).toBe('');
    expect(result.current.user.email).toBe('');
  });
  it('Check the updated user state', () => {
    const { result } = renderHook(() => useDataStore());

    act(() => {
      result.current.updateUser(userData.userId, userData.userEmail);
    });

    expect(result.current.user.id).toBe(userData.userId);
    expect(result.current.user.email).toBe(userData.userEmail);
  });
  it('Checks the reset user state matches default', () => {
    const { result } = renderHook(() => useDataStore());

    act(() => {
      result.current.updateUser(userData.userId, userData.userEmail);
      result.current.resetUser();
    });

    expect(result.current.user.id).toBe('');
    expect(result.current.user.email).toBe('');
  });
  it('Check the default NFL Teams state', () => {
    const { result } = renderHook(() => useDataStore());
    expect(result.current.NFLTeam.teamName).toBe('');
    expect(result.current.NFLTeam.teamLogo).toBe('');
  });
  it('Check the updated NFL Teams state', () => {
    const { result } = renderHook(() => useDataStore());

    act(() => {
      result.current.updateNFLTeam(gameData);
    });

    expect(result.current.NFLTeam.teamName).toBe(gameData.teamName);
    expect(result.current.NFLTeam.teamLogo).toBe(gameData.teamLogo);
  });
  it('Check the default userWeeklyPick state', () => {
    const { result } = renderHook(() => useDataStore());
    expect(result.current.user.id).toBe('');
    expect(result.current.userWeeklyPick.weekNumber).toBe('');
  });
  it('Check the updated userWeeklyPick state', () => {
    const { result } = renderHook(() => useDataStore());
    const weekData = { userId: '42', weekNumber: '51' }; 
    act(() => {
      result.current.updateUserWeeklyPick(weekData);
    });

    expect(result.current.user.id).toBe(weekData.userId);
    expect(result.current.userWeeklyPick.weekNumber).toBe(weekData.weekNumber);
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
      result.current.updateWeeklyPicks(gameData);
    });

    expect(result.current.weeklyPicks.gameId).toBe(gameData.gameId);
    expect(result.current.weeklyPicks.gameWeekId).toBe(gameData.gameWeekId);
    expect(result.current.weeklyPicks.userResults).toBe(gameData.userResults);
  });
});
