'use server';
import { users } from './serverConfig';

export const deleteUser = async (formData: FormData) => {
  const userId = formData.get('userId') as string;
  try {
    await users.delete(userId);
    return { success: true };
  } catch (error) {
    throw new Error('Error Deleting User');
  }
};
