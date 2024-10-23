import { renderHook } from '@testing-library/react';
import useIsUserLockedOut from './useIsUserLockedOut';

describe('useLockout hook', () => {
  let getUTCDaySpy: jest.SpyInstance;
  let getUTCHoursSpy: jest.SpyInstance;

  beforeEach(() => {
    getUTCDaySpy = jest.spyOn(Date.prototype, 'getUTCDay');
    getUTCHoursSpy = jest.spyOn(Date.prototype, 'getUTCHours');
  });

  afterEach(() => {
    getUTCDaySpy.mockRestore();
    getUTCHoursSpy.mockRestore();
  });

  it('should lock out on Saturday at 12am UTC', () => {
    getUTCDaySpy.mockReturnValue(6); //Mocking Saturday
    getUTCHoursSpy.mockReturnValue(0); //Mocking 12am UTC

    const { result } = renderHook(() => useIsUserLockedOut());

    expect(result.current).toBe(true);
  });

  it('should not be locked out on Wednesday at any time', () => {
    getUTCDaySpy.mockReturnValue(3); //Mocking Wednesday
    getUTCHoursSpy.mockReturnValue(12); //Mocking 12pm UTC

    const { result } = renderHook(() => useIsUserLockedOut());

    expect(result.current).toBe(false);
  });
});
