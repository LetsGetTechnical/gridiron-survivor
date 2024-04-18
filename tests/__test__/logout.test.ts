import logout from "../../api/logout"; // Assuming the file containing the logout function is named logout.js
import appwrite from "appwrite"
// import '@testing-library/jest-dom';

//mocking modules
jest.mock('appwrite');

test('should logout successful', () => {
  appwrite.get.mockResolvedValue(response);
})

//mock Implementations
const logoutMock = jest.fn();

test('logout was successful', () => {
  logoutMock.mockReturnValue(true);
})


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

