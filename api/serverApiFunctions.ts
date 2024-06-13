// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use server';
import { IDeleteUser, IUser } from './apiFunctions.interface';
import { users } from './serverConfig';

/**
 * Get all users.
 * @param userId - The user id.
 * @returns The user.
 */
export const deleteUser = async (userId: IUser['id']): Promise<IDeleteUser> => {
  try {
    await users.delete(userId);
    return { success: true };
  } catch (error) {
    throw new Error('Error Deleting User');
  }
};
