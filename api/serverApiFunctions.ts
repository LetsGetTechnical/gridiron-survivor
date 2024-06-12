'use server';
import { IUser } from './IapiFunctions';
import { users } from './serverConfig';

export const deleteUser = async (userId: IUser['id']) => {
  try {
    await users.delete(userId);
    return { success: true };
  } catch (error) {
    throw new Error('Error Deleting User');
  }
};
