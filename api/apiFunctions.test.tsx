import { loginAccount, logoutAccount, registerAccount } from './apiFunctions';
import { account } from './config';
const apiFunctions = require('./apiFunctions');

jest.mock('./apiFunctions', () => {
  const actualModule = jest.requireActual('./apiFunctions');
  return {
    ...actualModule,
    createWeeklyPicks: jest.fn(),
    getUserWeeklyPick: jest.fn(),
    getAllWeeklyPicks: jest.fn(),
  };
});

describe('Auth Functions', () => {
  jest.mock('./apiFunctions', () => ({
    loginAccount: jest.fn(),
    registerAccount: jest.fn(),
  }));

  xdescribe('login account successful', () => {
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

  account.create = jest.fn();
  describe('register account successful', () => {
    it('Should allow a user to register an account', async () => {
      const userDummy = {
        email: 'testemail0@email.com',
        password: 'test12345',
      };
      const response = await registerAccount(userDummy);
      expect(account.create).toHaveBeenCalledWith(
        expect.any(String),
        userDummy.email,
        userDummy.password,
      );
    });
  });
});

xtest('get weekly picks mock function', async () => {
  const users = { userId: '66174f2362ec891167be' };
  const resp = { data: users };

  // Mocking the getWeeklyPicks function
  jest.mock('./apiFunctions', () => ({
    getUserWeeklyPick: jest.fn().mockResolvedValue(resp),
  }));

  // Importing the mocked function
  const {
    getUserWeeklyPick: mockGetUserWeeklyPick,
  } = require('./apiFunctions');

  // Call the function
  const result = await mockGetUserWeeklyPick();

  // Assertions
  expect(result).toEqual(resp); // Check if the result matches the expected response
});

describe('Get Weekly Picks Mock function', () => {
  it('should mock getWeeklyPicks function', async () => {
    const users = { $id: '663130a100297f77c3c8' };
    const resp = { data: users };

    apiFunctions.getUserWeeklyPick.mockResolvedValue(resp);

    const result = await apiFunctions.getUserWeeklyPick({
      userId: '66281d5ec5614f76bc91',
      weekNumber: '6622c75658b8df4c4612',
    });

    expect(result).toEqual(resp);
  });
});

describe('Create Weekly Picks Mock Function', () => {
  it('should mock createWeeklyPicks function', async () => {
    const users = { team: '66218f22b40deef340f8', correct: false };
    const resp = { data: users };

    apiFunctions.createWeeklyPicks.mockResolvedValue(resp);

    const result = await apiFunctions.createWeeklyPicks({
      gameWeekId: '6622c7596558b090872b',
      gameId: '66311a210039f0532044',
      userResults:
        '{"66281d5ec5614f76bc91":{"team":"66218f22b40deef340f8","correct":false},"6628077faeeedd272637":{"team":"6621b30ea57bd075e9d3","correct":false}, "66174f2362ec891167be":{"team": "6621b30ea57bd075e9d3", "correct":true}}',
    });

    expect(result).toEqual(resp);
  });
});

describe('Get All Weekly Picks Mock Function', () => {
  it('should mock getAllWeeklyPicks function', async () => {
    const weeklyPicks = {
      '66281d5ec5614f76bc91': { team: '66218f22b40deef340f8', correct: false },
      '6628077faeeedd272637': { team: '6621b30ea57bd075e9d3', correct: false },
      '66174f2362ec891167be': { team: '6621b30ea57bd075e9d3', correct: true },
    };
    const response = { data: weeklyPicks };

    apiFunctions.getAllWeeklyPicks.mockResolvedValue(response);

    const result = await apiFunctions.getAllWeeklyPicks();

    expect(result).toEqual(response);
  });
});
