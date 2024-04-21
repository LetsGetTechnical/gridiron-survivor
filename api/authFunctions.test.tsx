import React from 'react';
import { useRouter } from 'next/navigation';
import account from './appwrite';
import { login, logout} from './authFunctions';

//logout method
// Mock the account module
jest.mock('./appwrite', () => ({
  createEmailPasswordSession: jest.fn(),
  deleteSession: jest.fn(),
}));

// Mock the router module
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('Auth Functions', () => {
  // Test the login function
  describe('login', () => {
    it('should log in successfully', async () => {
      // Mock useRouter
      const pushMock = jest.fn();
      (useRouter as jest.Mock).mockReturnValueOnce({ push: pushMock });

      // Mock successful login
      (account.createEmailPasswordSession as jest.Mock).mockResolvedValueOnce(1);
      const email = 'test@example.com';
      const password = 'password';

      await login(email, password);

      // Expectations
      expect(account.createEmailPasswordSession).toHaveBeenCalledWith(email, password);
      await new Promise(resolve => setTimeout(resolve, 0));
  expect(pushMock).toHaveBeenCalledWith('/dashboard');
    });
  });

  // Test the logout function
  describe('logout', () => {
    it('should log out successfully', async () => {
      // Mock useRouter
      const pushMock = jest.fn();
      (useRouter as jest.Mock).mockReturnValueOnce({ push: pushMock });

      // Mock successful logout
      (account.deleteSession as jest.Mock).mockResolvedValueOnce(undefined);

      await logout();

      // Expectations
      expect(account.deleteSession).toHaveBeenCalledWith('current');
      expect(pushMock).toHaveBeenCalledWith('/');
    });

    it('should handle logout failure', async () => {
      // Mock useRouter
      const pushMock = jest.fn();
      (useRouter as jest.Mock).mockReturnValueOnce({ push: pushMock });

      // Mock failed logout
      const error = new Error('Logout failed');
      (account.deleteSession as jest.Mock).mockRejectedValueOnce(error);

      await logout();

      // Expectations
      expect(account.deleteSession).toHaveBeenCalledWith('current');
      expect(console.error).toHaveBeenCalledWith(error);
    });
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

