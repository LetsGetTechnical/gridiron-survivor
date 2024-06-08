'use server';
import { users } from './serverConfig';

export const deleteUser = async (userId: string) => {
  const result = await users.delete(userId);
  return result;
};

export const updateEmail = async (userId: string, email: string) => {
  const result = await users.updateEmail(userId, email);
  return result;
};
