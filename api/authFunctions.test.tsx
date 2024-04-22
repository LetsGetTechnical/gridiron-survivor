import { logout } from './authFunctions';

describe('Auth Functions', () => {
  // Test the login function
  describe('login', () => {
    test("validate function should pass on correct input", () => {
      const email = "testemail@email.com";
  const password = "test1234";
  
  // Mock the login function
  const mockLogin = jest.fn();
  mockLogin(email, password);
      expect(mockLogin).toHaveBeenCalledTimes(1);
    })
    });
     

  // Test the logout function
  describe('logout', () => {
    test('should log out successfully', () => {
      logout()
    });
   });
});



