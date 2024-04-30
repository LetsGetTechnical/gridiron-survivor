import { loginAccount, logoutAccount } from './apiFunctions';
import { account } from './config';
const apiFunctions = require("./apiFunctions");

jest.mock("./apiFunctions", ()=> {
  const actualModule = jest.requireActual("./apiFunctions");
  return {
    ...actualModule,
    createWeeklyPicks: jest.fn(),
    getWeeklyPicks: jest.fn()
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
    const users = { userId: '66174f2362ec891167be' };
    const resp = { data: users };  

    apiFunctions.getWeeklyPicks.mockResolvedValue(resp);

    const result = await apiFunctions.getWeeklyPicks();

    expect(result).toEqual(resp);
  });
});
describe("Create Weekly Picks Mock Function", () => {
  it("should mock createWeeklyPicks function", async () => {
    const users = { userId: "662812635f10f3ec3c17", survivor: true};
    const resp = {data: users};

    apiFunctions.createWeeklyPicks.mockResolvedValue(resp);

    const result = await apiFunctions.createWeeklyPicks({userId: "662812635f10f3ec3c17", survivor: true, documentID: "6621b335c21daa646ab0"})

    expect(result).toEqual(resp);

  })
})