// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { Models } from 'appwrite/types/models';
import { account, databases, ID, appwriteConfig } from './config';
import {
  IAccountData,
  ILeague,
  IGameWeek,
  IUser,
  IWeeklyPicks,
  INFLTeam,
  IRecoveryToken,
} from './apiFunctions.interface';
import { Collection, Document } from './apiFunctions.enum';
import { Query } from 'appwrite';
import {
  IEntry,
  IEntryProps,
} from '@/app/(main)/league/[leagueId]/entry/Entries.interface';
import { getBaseURL } from '@/utils/getBaseUrl';

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
 * Recover a User Password
 * @param props - the props for the recover password function
 * @param props.email - the email of the user
 * @returns {Promise<IRecoveryToken>} - the recovery token
 */
export async function recoverPassword({
  email,
}: {
  email: string;
}): Promise<IRecoveryToken> {
  const baseURL = getBaseURL();

  try {
    return await account.createRecovery(email, `${baseURL}/account/recovery`);
  } catch (error) {
    throw error;
  }
}

/**
 * Reset a User's Recovered Password
 * @param props - the props for the reset password function
 * @param props.userId - the user id
 * @param props.token - the recovery token
 * @param props.password - the new password
 * @returns {Promise<void>}
 */
export async function resetRecoveredPassword({
  userId,
  token,
  password,
}: {
  userId: string;
  token: string;
  password: string;
}): Promise<IRecoveryToken> {
  try {
    return await account.updateRecovery(userId, token, password);
  } catch (error) {
    throw error;
  }
}

/**
 * Resets a user's password from the settings page
 * @param params - The params for the reset password function
 * @param params.newPassword - The new password
 * @param params.oldPassword - The old password
 * @returns {Promise<void>}
 */
export async function resetPassword({
  newPassword,
  oldPassword,
}: {
  newPassword: string;
  oldPassword: string;
}): Promise<void> {
  try {
    await account.updatePassword(newPassword, oldPassword);
  } catch (error) {
    console.error('Password reset failed:', error);
    throw error;
  }
}

/**
 * Update the user email
 * @param props - The props for the update email function
 * @param props.email - The email
 * @param props.password - The user's current password
 * @returns {Promise<void>} - The updated user
 */
export async function updateUserEmail({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<void> {
  try {
    const result = await account.updateEmail(email, password);

    const userDocument = await databases.listDocuments(
      appwriteConfig.databaseId,
      Collection.USERS,
      [Query.equal('userId', result.$id)],
    );

    await databases.updateDocument(
      appwriteConfig.databaseId,
      Collection.USERS,
      userDocument.documents[0].$id,
      {
        email: email,
        name: userDocument.documents[0].name,
        labels: userDocument.documents[0].labels,
        userId: userDocument.documents[0].userId,
        leagues: userDocument.documents[0].leagues,
      },
    );
  } catch (error) {
    console.error('Error updating user email:', error);
    throw error;
  }
}

/**
 * Get the current user
 * @param userId - The user ID
 * @returns {Models.DocumentList<Models.Document> | Error} - The user object or an error
 */
export async function getCurrentUser(userId: IUser['id']): Promise<IUser> {
  try {
    const user = await databases.listDocuments(
      appwriteConfig.databaseId,
      Collection.USERS,
      [Query.equal('userId', userId)],
    );
    return {
      documentId: user.documents[0].$id,
      id: user.documents[0].userId,
      email: user.documents[0].email,
      leagues: user.documents[0].leagues,
    };
  } catch (error) {
    console.error(error);
    throw new Error('Error getting current user');
  }
}

/**
 * Get all the leagues the user is a part of
 * @param userId - The user Id
 * @param leagueId - The league Id
 * @returns {IEntry[] | Error} - The list of entries or an error
 */
export async function getCurrentUserEntries(
  userId: IUser['id'],
  leagueId: ILeague['leagueId'],
): Promise<IEntry[]> {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      Collection.ENTRIES,
      [Query.equal('user', userId), Query.equal('league', leagueId)],
    );

    const entries = response.documents.map((entry) => ({
      $id: entry.$id,
      name: entry.name,
      user: entry.user,
      league: entry.league,
      selectedTeams: entry.selectedTeams,
      eliminated: entry.eliminated,
    }));

    return entries;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting user entries');
  }
}

/**
 * Get all NFL teams
 * @returns {INFLTeam | Error} - The list of NFL teams
 */
export const getNFLTeams = async (): Promise<INFLTeam[]> => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      Collection.NFL_TEAMS,
      [Query.limit(32)],
    );

    const nflTeams = response.documents.map((team) => ({
      teamId: team.$id,
      teamLogo: team.teamLogo,
      teamName: team.teamName,
    }));

    return nflTeams;
  } catch (error) {
    console.error(error);
    throw new Error('Error getting NFL teams');
  }
};

/**
 * Get game the user is a part of
 * @param leagueId - The league ID
 * @returns {Models.Document | Error} - The game group or an error
 */
export const getCurrentLeague = async (
  leagueId: ILeague['leagueId'],
): Promise<ILeague> => {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      Collection.LEAGUE,
      [Query.contains('$id', leagueId)],
    );

    return {
      leagueId: response.documents[0].$id,
      leagueName: response.documents[0].leagueName,
      logo: response.documents[0].logo,
      participants: response.documents[0].participants,
      survivors: response.documents[0].survivors,
    };
  } catch (error) {
    console.error('Error getting all game groups:', error);
    throw new Error('Error getting all game groups');
  }
};

/**
 * Get the current week's ID & number
 * @returns {IGameWeek | Error} - The current week or an error
 */
export const getGameWeek = async (): Promise<IGameWeek> => {
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
 * @param props - The game ID and week ID
 * @param props.leagueId - The league ID
 * @param props.weekId - The week ID
 * @returns {IWeeklyPicks['userResults'] | null} - The user results or null
 */
export async function getAllWeeklyPicks({
  leagueId,
  weekId,
}: {
  leagueId: ILeague['leagueId'];
  weekId: IGameWeek['id'];
}): Promise<IWeeklyPicks['userResults'] | null> {
  const currentYear = new Date().getFullYear().toString();

  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      Collection.GAME_RESULTS,
      [Query.equal('leagueId', leagueId), Query.equal('gameWeekId', weekId)],
    );

    if (response.total === 0) {
      const newDocument = await databases.createDocument(
        appwriteConfig.databaseId,
        Collection.GAME_RESULTS,
        ID.unique(),
        {
          leagueId: leagueId,
          gameWeekId: weekId,
          userResults: '{}',
          year: currentYear,
        },
      );

      return JSON.parse(newDocument.documents[0].userResults);
    }

    return JSON.parse(response.documents[0].userResults);
  } catch (error) {
    console.error(error);
    throw new Error('Error getting all weekly picks');
  }
}

/**
 *  Update the weekly picks with the users team pick
 * @param props - The weekly picks data
 * @param props.leagueId - The league ID
 * @param props.gameWeekId - The game week ID
 * @param props.userResults - The user results
 * @returns {Models.User<Models.Preferences> | Error} - The user object or an error
 */
export async function createWeeklyPicks({
  leagueId,
  gameWeekId,
  userResults,
}: IWeeklyPicks): Promise<Models.Document> {
  try {
    const getLeagueGameResults = await databases.listDocuments(
      appwriteConfig.databaseId,
      Collection.GAME_RESULTS,
      [
        Query.equal('leagueId', leagueId),
        Query.equal('gameWeekId', gameWeekId),
      ],
    );

    return await databases.updateDocument(
      appwriteConfig.databaseId,
      Collection.GAME_RESULTS, //collectionID
      getLeagueGameResults.documents[0].$id, //documentID
      {
        leagueId,
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
 * Create a new entry
 * @param props - The entry data
 * @param props.name - The name of the entry
 * @param props.user - The user ID
 * @param props.league - The league ID
 * @param props.selectedTeams - The selected teams
 * @returns {Models.Document | Error} - The entry object or an error
 */
export async function createEntry({
  name,
  user,
  league,
  selectedTeams = [],
}: IEntryProps): Promise<Models.Document & IEntry> {
  try {
    return await databases.createDocument(
      appwriteConfig.databaseId,
      Collection.ENTRIES,
      ID.unique(),
      {
        name,
        user,
        league,
        selectedTeams,
      },
    );
  } catch (error) {
    console.error(error);
    throw new Error('Error creating entry');
  }
}

/**

 * Update an entry
 * @param props - The entry data
 * @param props.entryId - The entry ID
 * @param props.selectedTeams - The selected teams
 * @returns {Models.Document | Error} - The entry object or an error
 */
export async function updateEntry({
  entryId,
  selectedTeams,
}: {
  entryId: string;
  selectedTeams: INFLTeam['teamName'][];
}): Promise<Models.Document & IEntry> {
  try {
    return await databases.updateDocument(
      appwriteConfig.databaseId,
      Collection.ENTRIES,
      entryId,
      {
        selectedTeams,
      },
    );
  } catch (error) {
    console.error(error);
    throw new Error('Error updating entry');
  }
}

/**
 * Retrieves a list of all leagues.
 * @returns {Models.Document[]} A list of all available leagues.
 */
export async function getAllLeagues(): Promise<ILeague[]> {
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      Collection.LEAGUE,
    );

    // loop through leagues and return ILeague[] instead of Models.Document[]
    const leagues = response.documents.map((league) => ({
      leagueId: league.$id,
      leagueName: league.leagueName,
      logo: '',
      participants: league.participants,
      survivors: league.survivors,
    }));

    return leagues;
  } catch (error) {
    throw new Error('Error getting all leagues', { cause: error });
  }
}

/**
 * Adds a user to a league by updating the user's entry document.
 * @param {string} userDocumentId - The ID of the user to add to the league.
 * @param {string} selectedLeague - The ID of the league to add the user to.
 * @param selectedLeagues - The user selected leagues
 * @param participants - The user's participants
 * @param survivors - The user's survivors
 * @returns {Promise<void>} A promise that resolves when the user has been added to the league.
 */
export async function addUserToLeague({
  userDocumentId,
  selectedLeague,
  selectedLeagues,
  participants,
  survivors,
}: {
  userDocumentId: string;
  selectedLeague: string;
  selectedLeagues: string[];
  participants: string[];
  survivors: string[];
}): Promise<void> {
  try {
    await databases.updateDocument(
      appwriteConfig.databaseId,
      Collection.USERS,
      userDocumentId,
      {
        leagues: selectedLeagues,
      },
    );

    await databases.updateDocument(
      appwriteConfig.databaseId,
      Collection.LEAGUE,
      selectedLeague,
      {
        participants: participants,
        survivors: survivors,
      },
    );
  } catch (error) {
    throw new Error('Error getting user document ID', { cause: error });
  }
}
