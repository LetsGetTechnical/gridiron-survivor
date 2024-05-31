import { Models } from 'appwrite/types/models';
import { account, databases, ID, appwriteConfig } from './config';
import {
  IAccountData,
  IGameGroup,
  IGameWeek,
  IUser,
  IWeeklyPicks,
} from './IapiFunctions';
import { Collection, Document } from './EapiFunctions';
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
 * Login to an existing account
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
 * Logout the current user
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
 * Get the current user
 *
 * @return {Models.DocumentList<Models.Document> | Error} - The user object or an error
 */
export async function getCurrentUser(userId: IUser['id']): Promise<IUser> {
  try {
    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      Collection.USERS,
      [Query.equal('userId', userId)],
    );

    return {
      id: user.documents[0].userId,
      email: user.documents[0].email,
      league: user.documents[0].league,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Error getting current user');
  }
}

/**
 * Get all NFL teams
 *
 * @return {Models.DocumentList<Models.Document> | Error} - The list of NFL teams
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
 *
 *
 */
export const getCurrentGame = async (
  userId: IUser['id'],
): Promise<Models.Document> => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      Collection.GAMES,
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
 *
 *
 */
export const getCurrentWeek = async (): Promise<IGameWeek> => {
  try {
    const response = await databases.getDocument(
      appwriteConfig.databaseId,
      Collection.CURRENT_WEEK,
      Document.CURRENT_GAME_WEEK,
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
