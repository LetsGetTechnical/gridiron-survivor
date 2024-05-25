import { Models } from 'appwrite/types/models';
import { account, databases, ID, appwriteConfig } from './config';
import {
  IAccountData,
  IWeeklyPicks,
  IGameWeek,
  IGameGroup,
  INFLTeam,
  IUser,
} from './IapiFunctions';
import { Query } from 'appwrite';

/**
 * Register a new account
 *
 * @return {Models.User<Models.Preferences> | Error} - The user object or an error
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
 * Get the current session of the user
 *
 * @param email - The email of the user
 * @param password - The password of the user
 * @return {Models.Session | Error} - The session object or an error
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
 * Logout the current session of the user
 *
 * @return {Object | Error} - The session object or an error
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
 *
 * @return {Models.DocumentList<Models.Document> | Error} - The list of NFL teams
 */
export async function getNFLTeams(): Promise<Models.Document[]> {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      '662152bfabacfbda3bb3',
    );

    return response.documents;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting NFL teams');
  }
}

/**
 * Get the current week's ID & number
 *
 *
 */
export async function getCurrentWeek(): Promise<IGameWeek> {
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
}

/**
 * Get game the user is a part of
 *
 *
 */
export async function getCurrentGame(
  userId: IUser['id'],
): Promise<Models.Document> {
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
}

/**
 * Get all weekly picks
 *
 *
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
      '66313025000612a5380e',
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
 * Update weekly pick selection for current game
 *
 * @return {Models.User<Models.Preferences> | Error} - The user object or an error
 */
export async function createWeeklyPicks({
  gameId,
  gameWeekId,
  userResults,
}: IWeeklyPicks): Promise<Models.Document> {
  try {
    return await databases.updateDocument(
      appwriteConfig.databaseId,
      '66313025000612a5380e', //collectionID
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
