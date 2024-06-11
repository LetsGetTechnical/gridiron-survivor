'use server';
import { deleteUser } from './serverApiFunctions';
import { users } from './serverConfig';

jest.mock('./serverConfig', () => ({
  users: {
    delete: jest.fn(),
  },
}));

describe('deleteUser', () => {
  it('should delete the user and return the result', async () => {
    const mockUserId = '12345';
    const mockResult = { success: true };

    // Set up the mock implementation for the delete method
    (users.delete as jest.Mock).mockResolvedValue(mockResult);

    // Create a mock FormData object
    const formData = new FormData();
    formData.append('userId', mockUserId);

    // Call the deleteUser function
    const result = await deleteUser(formData);

    // Assert that the delete method was called with the correct userId
    expect(users.delete).toHaveBeenCalledWith(mockUserId);

    // Assert that the result is as expected
    expect(result).toEqual(mockResult);
  });

  it('should handle errors correctly', async () => {
    const mockUserId = '12345';
    const mockError = new Error('Error Deleting User');

    // Set up the mock implementation for the delete method to throw an error
    (users.delete as jest.Mock).mockRejectedValue(mockError);

    // Create a mock FormData object
    const formData = new FormData();
    formData.append('userId', mockUserId);

    // Call the deleteUser function and assert that it throws an error
    await expect(deleteUser(formData)).rejects.toThrow('Error Deleting User');

    // Assert that the delete method was called with the correct userId
    expect(users.delete).toHaveBeenCalledWith(mockUserId);
  });
});
