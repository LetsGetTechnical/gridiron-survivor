'use server';
import { users } from './serverConfig';

export const deleteUser = async (formData: FormData) => {
  const userId = formData.get('userId') as string;
  const result = await users.delete(userId);
  console.log(result);
  return result;
};
