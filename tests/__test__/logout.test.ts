import {logout } from "../../api/logout"; // Assuming the file containing the logout function is named logout.js
import {account } from "../../api/logout";
import jest from "jest";

jest.mock('account', () => ({
  account: {
    deleteSession: jest.fn(),
  }
}));

  it('calls deleteSession with "current" parameter and returns session', async () => {
    // Mock the return value of deleteSession
    const session = { id: 'sessionId' };
    account.deleteSession.mockResolvedValue(session);

    // Call the function under test
    const result = await logout();

    // Expectations
    expect(account.deleteSession).toHaveBeenCalledWith('current');
    expect(result).toEqual(session);
  });

