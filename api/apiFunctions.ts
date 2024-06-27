// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Models } from 'appwrite/types/models';
import { account, databases, ID, appwriteConfig } from './config';
import {
  IAccountData,
  IGameGroup,
  IGameWeek,
  IUser,
  IWeeklyPicks,
} from './apiFunctions.interface';
import { Collection } from './apiFunctions.enum';
import { Query } from 'appwrite';

/**
 * Register a new account
 * @param props - The account data
 * @param props.email - The email of the user
 * @param props.password - The password of the user
 * @returns {Models.User<Models.Preferences> | Error} - The user object or an error
 */
export async function registerAccount({
  email,
  password,
}: IAccountData): Promise<Models.User<Models.Preferences>> {
  try {
    return await account.create(ID.unique(), email, password);
  } catch (error) {
    console.error(error);
    throw new Error('Error registering user');
  }
}

/**
 * Login to an existing account
 * @param props - The account data
 * @param props.email - The email of the user
 * @param props.password - The password of the user
 * @returns {Models.Session | Error} - The session object or an error
 */
export async function loginAccount({
  email,
  password,
}: IAccountData): Promise<Models.Session | Error> {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (error) {
    console.error(error);
    throw new Error('Error logging in user');
  }
}

/**
 * Create a token for Magic URL
 * @param props - The account data
 * @param magicEmail - The user's email
 * @returns {Models.Session | Error} - The session object or an error
 */
export async function getMagicUrlToken(): Promise<Models.Token | Error> {
  try {
    return await account.createMagicURLToken(
      ID.unique(),
      'alexappleget2014@gmail.com',
      'http://localhost:3000/auth/magicUrl',
    );
  } catch (error) {
    console.error(error);
    throw new Error('Error creating token');
  }
}

/**
 * Logout the current user
 * @returns {object | Error} - The session object or an error
 */
export async function logoutAccount(): Promise<{}> {
  try {
    return await account.deleteSession('current');
  } catch (error) {
    console.error(error);
    throw new Error('Error logging out user');
  }
}

/**
 * Get all NFL teams
 * @returns {Models.DocumentList<Models.Document> | Error} - The list of NFL teams
 */
export const getNFLTeams = async (): Promise<Models.Document[]> => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      Collection.NFL_TEAMS,
    );

    return response.documents;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting NFL teams');
  }
};

/**
 * Get game the user is a part of
 * @param userId - The user ID
 * @returns {Models.Document | Error} - The game group or an error
 */
export const getCurrentGame = async (
  userId: IUser['id'],
): Promise<Models.Document> => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      '6626a937b6302f6a4d28',
      [Query.contains('participants', userId)],
    );

    return response.documents[0];
  } catch (error) {
    console.error('Error getting all game groups:', error);
    throw new Error('Error getting all game groups');
  }
};

/**
 * Get the current week's ID & number
 * @returns {IGameWeek | Error} - The current week or an error
 */
export const getCurrentWeek = async (): Promise<IGameWeek> => {
  try {
    const response = await databases.getDocument(
      appwriteConfig.databaseId,
      'current_week',
      '664cfd88003c6cf2ff75',
    );

    return {
      id: response.gameWeek.$id,
      week: response.gameWeek.week,
    };
  } catch (error) {
    console.error('Error getting current week:', error);
    throw new Error('Error getting current week');
  }
};

/**
 * Get all weekly picks
 * @param props - The game ID and week ID
 * @param props.gameId - The game ID
 * @param props.weekId - The week ID
 * @returns {IWeeklyPicks['userResults'] | null} - The user results or null
 */
export async function getAllWeeklyPicks({
  gameId,
  weekId,
}: {
  gameId: IGameGroup['currentGameId'];
  weekId: IGameWeek['id'];
}): Promise<IWeeklyPicks['userResults'] | null> {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      Collection.GAME_RESULTS,
      [Query.equal('gameId', gameId), Query.equal('gameWeekId', weekId)],
    );

    // check if any users have selected their pick
    if (response.documents[0].userResults === '') {
      return null;
    }

    const data = JSON.parse(response.documents[0].userResults);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting all weekly picks');
  }
}

/**
 *  Update the weekly picks with the users team pick
 * @param props - The weekly picks data
 * @param props.gameId - The game ID
 * @param props.gameWeekId - The game week ID
 * @param props.userResults - The user results
 * @returns {Models.User<Models.Preferences> | Error} - The user object or an error
 */
export async function createWeeklyPicks({
  gameId,
  gameWeekId,
  userResults,
}: IWeeklyPicks): Promise<Models.Document> {
  try {
    return await databases.updateDocument(
      appwriteConfig.databaseId,
      Collection.GAME_RESULTS, //collectionID
      '663130a100297f77c3c8', //documentID
      {
        gameId,
        gameWeekId,
        userResults: JSON.stringify(userResults),
      },
    );
  } catch (error) {
    console.error(error);
    throw new Error('Error creating weekly picks');
  }
}
