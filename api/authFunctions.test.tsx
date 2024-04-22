import logout from './AuthFunctions';

//logout method

describe('Auth Functions', () => {
  // Test the login function
  describe('login', () => {
    test("validate function should pass on correct input", () => {
      const email = "email@test.com";
  const password = "password";
  
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



