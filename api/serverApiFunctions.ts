'use server';
import { users } from './serverConfig';

export const getUser = async (userId: string) => {
  const result = await users.get(userId);
  return result;
};

export const deleteUser = async (userId: string) => {
  const result = await users.delete(userId);
  return result;
};
