import { renderHook, act } from '@testing-library/react';
import { useDataStore } from './dataStore';

// test values
const userId = '123';
const userEmail = 'test@email.com';

describe('Data Store', () => {
  it('Check the default user state', () => {
    const { result } = renderHook(() => useDataStore());
    expect(result.current.user.id).toBe('');
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

    expect(result.current.user.id).toBe(userId);
    expect(result.current.user.email).toBe(userEmail);

    act(() => {
      result.current.reset();
    });

    expect(result.current.user.id).toBe('');
    expect(result.current.user.email).toBe('');
  });
});
