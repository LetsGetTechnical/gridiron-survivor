import { renderHook } from "@testing-library/react"
import useLockout from "./useLockout"

describe('useLockout hook', () => {
    let getUTCDaySpy: jest.SpyInstance;
    let getUTCHoursSpy: jest.SpyInstance;

    beforeEach(() => {
        getUTCDaySpy = jest.spyOn(Date.prototype, 'getUTCDay');
        getUTCHoursSpy = jest.spyOn(Date.prototype, 'getUTCHours');
    })

    afterEach(() => {
        getUTCDaySpy.mockRestore();
        getUTCHoursSpy.mockRestore();
    })
    it('should lock out on Friday at 12am UTC', () => {
        getUTCDaySpy.mockReturnValue(5); //Mocking Friday
        getUTCHoursSpy.mockReturnValue(0); //Mocking 12am UTC

        const { result } = renderHook(() => useLockout());

        expect(result.current).toBe(true);
    });

    it('should not be locked out on Wednesday at any time', () => {
        getUTCDaySpy.mockReturnValue(3); //Mocking Wednesday
        getUTCHoursSpy.mockReturnValue(12); //Mocking 12pm UTC

        const { result } = renderHook(() => useLockout());

        expect(result.current).toBe(false);
    })
})