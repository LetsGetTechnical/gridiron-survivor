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
} from './apiFunctions.interface';
import { Collection, Document } from './apiFunctions.enum';
import { Query } from 'appwrite';
import {
  IEntry,
  IEntryProps,
} from '@/app/(main)/league/[leagueId]/entry/Entries.interface';

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
 * Logout the current user
 * @returns {object | Error} - The session object or an error
 */
export async function logoutAccount(): Promise<object | Error> {
  try {
    return await account.deleteSession('current');
  } catch (error) {
    console.error(error);
    throw new Error('Error logging out user');
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
  try {
    const response = await databases.listDocuments(
      appwriteConfig.databaseId,
      Collection.GAME_RESULTS,
      [Query.equal('gameId', leagueId), Query.equal('gameWeekId', weekId)],
    );

    // check if any users have selected their pick
    if (response.documents[0].userResults === '') {
      return null;
    }

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
    return await databases.updateDocument(
      appwriteConfig.databaseId,
      Collection.GAME_RESULTS, //collectionID
      '663130a100297f77c3c8', //documentID
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
