import { act } from 'react-dom/test-utils';
import { renderHook } from '@testing-library/react';
import useAuthFunctions from '@/api/authFunctions'; // Update the import path

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

// Mock the account module
jest.mock('appwrite', () => ({
  account: {
    deleteSession: jest.fn().mockResolvedValue(null), // Mock deleteSession to resolve immediately
    createEmailPasswordSession: jest.fn(),
    create: jest.fn(),
  },
}));

describe('useAuthFunctions', () => {
  it('should successfully log the user out and redirect to the home page', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useAuthFunctions());
    const { logout } = result.current;

    await act(async () => {
      await logout();
    });

    expect(result.current.loading).toBe(false); // Ensure loading state is updated
    expect(result.current.logout).toBeInstanceOf(Function); // Ensure logout function exists
    expect(result.current.loading).toBe(false); // Ensure loading state is updated
    expect(result.current.login).toBeInstanceOf(Function); // Ensure login function exists

    // Ensure deleteSession is called with 'current'
    expect(require('appwrite').account.deleteSession).toHaveBeenCalledWith('current');

    // Ensure router.push is called with '/'
    expect(require('next/navigation').useRouter().push).toHaveBeenCalledWith('/');
  });
});


//mocking modules
// jest.mock('appwrite');

// test('should logout successful', () => {
//   appwrite.get.mockResolvedValue(response);
// })

//mock Implementations
// const logoutMock = jest.fn();

// test('logout was successful', () => {
//   logoutMock.mockReturnValue(true);
// })


//yesterday's notes
  // it('calls deleteSession with "current" parameter and returns session', async () => {
  //   Mock the return value of deleteSession
  //   const session = { id: 'sessionId' };
  //   account.deleteSession.mockResolvedValue(session);

  //    Call the function under test
  //   const result = await logout();

  //    Expectations
  //   expect(account.deleteSession).toHaveBeenCalledWith('current');
  //   expect(result).toEqual(session);
  // });

