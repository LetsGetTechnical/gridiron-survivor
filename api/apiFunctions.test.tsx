import { loginAccount, logoutAccount } from './apiFunctions';
import { account } from './config';
const apiFunctions = require("./apiFunctions");

jest.mock("./apiFunctions", ()=> {
  const actualModule = jest.requireActual("./apiFunctions");
  return {
    ...actualModule,
    createWeeklyPicks: jest.fn(),
    getUserWeeklyPick: jest.fn()
  }
})

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


describe("Get Weekly Picks Mock function", () => {
  it('should mock getWeeklyPicks function', async () => {
    const users = {$id: '663130a100297f77c3c8' };
    const resp = { data: users };  

    apiFunctions.getUserWeeklyPick.mockResolvedValue(resp);

    const result = await apiFunctions.getUserWeeklyPick('66281d5ec5614f76bc91', 1);

    expect(result).toEqual(resp);
  });
});
describe("Create Weekly Picks Mock Function", () => {
  it("should mock createWeeklyPicks function", async () => {
    const users = { team: '66218f22b40deef340f8', correct: false };
    const resp = {data: users};

    apiFunctions.createWeeklyPicks.mockResolvedValue(resp);

    const result = await apiFunctions.createWeeklyPicks({gameWeekId: "6622c7596558b090872b",gameId: "66311a210039f0532044", userResults: "{\"66281d5ec5614f76bc91\":{\"team\":\"66218f22b40deef340f8\",\"correct\":false},\"6628077faeeedd272637\":{\"team\":\"6621b30ea57bd075e9d3\",\"correct\":false}, \"66174f2362ec891167be\":{\"team\": \"6621b30ea57bd075e9d3\", \"correct\":true}}"})

    expect(result).toEqual(resp);

  })
})