import { loginAccount, logoutAccount } from './apiFunctions';
import { account } from './config';

describe('Auth Functions', () => {
  jest.mock('./apiFunctions', () => ({
    loginAccount: jest.fn(),
  }));

  describe('login account successful', () => {
    it('should show user login successfully', async () => {
      const userDummy = {
        email: 'testemail@email.com',
        password: 'test1234',
      };
      await loginAccount(userDummy);
      expect(account.createEmailPasswordSession).toBeInstanceOf(Object);
    });

    //user failed to log in
    it('should send error if user could not log in', async () => {
      const failDummy = {
        email: 'testemil@email.com',
        password: 'tet1234679',
      };
      await loginAccount(failDummy);
      expect(loginAccount(failDummy)).rejects.toThrow('error');
    });
  });

  // Test the logout function
  describe('logout account works', () => {
    it('should log out successfully', async () => {
      jest
        .spyOn(account, 'deleteSession')
        .mockResolvedValueOnce('Session deleted');
      await logoutAccount();
      expect(account.deleteSession).toHaveBeenCalledTimes(1);
    });
  });
});


test('get weekly picks mock function', async () => {
  const users = { userId: '66174f2362ec891167be' };
  const resp = { data: users };

  // Mocking the getWeeklyPicks function
  jest.mock("./apiFunctions", () => ({
      getWeeklyPicks: jest.fn().mockResolvedValue(resp)
  }));

  // Importing the mocked function
  const { getWeeklyPicks: mockGetWeeklyPicks } = require("./apiFunctions");

  // Call the function
  const result = await mockGetWeeklyPicks();

  // Assertions
  expect(result).toEqual(resp); // Check if the result matches the expected response
});
