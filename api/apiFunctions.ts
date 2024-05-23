import { Models } from 'appwrite/types/models';
import { account, databases, ID, appwriteConfig } from './config';
import { IAccountData, IWeeklyPicks, IGameWeek } from './IapiFunctions';

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
 * Get all weekly picks
 *
 *
 */
export async function getAllWeeklyPicks(): Promise<
  IWeeklyPicks['userResults'] | null
> {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      '66313025000612a5380e',
    );

    // check if any users have selected their pick
    if (response.documents[0].userResults === '') {
      return null;
    }

    // TODO: need to check for proper data structure or return error

    const data = JSON.parse(response.documents[0].userResults);
    return data;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting all weekly picks');
  }
}

/**
 * Get all NFL teams
 *
 * @return {Models.DocumentList<Models.Document>} - The session object or an error
 */
export async function getNFLTeams(): Promise<
  Models.DocumentList<Models.Document>
> {
  try {
    return await databases.listDocuments(
      appwriteConfig.databaseId,
      '662152bfabacfbda3bb3',
    );
  } catch (error) {
    console.error(error);
    throw new Error('Error getting NFL teams');
  }
}

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
 * Get the current user
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

/**
 * Get all game groups
 *
 *
 */
export async function getAllGameGroups(): Promise<Models.Document | null> {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId, 
      '6626a937b6302f6a4d28');
      console.log(response)
    
    const gameGroupDocument = response.documents[0];
    
    if (!gameGroupDocument || !gameGroupDocument.participants) {
      return null;
    }

    console.log("gameGroupDocument:", gameGroupDocument);
    
    return gameGroupDocument;
  } catch (error) {
    console.error("Error getting all game groups:", error);
    throw new Error('Error getting all game groups');
  }

}