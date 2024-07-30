// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import {
  IGameWeek,
  IUser,
  IUserPick,
  INFLTeam
} from '@/api/apiFunctions.interface';
import { getAllWeeklyPicks, getCurrentLeague, getCurrentUserEntries } from '@/api/apiFunctions';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  IGetGameWeekResults,
  IGetUserPick,
} from './utils.interface';
import { ILeague } from '@/api/apiFunctions.interface';
import { IEntry } from '@/app/(main)/league/[leagueId]/entry/Entries.interface';

/**
 * Combine class names
 * @param inputs - The class names to combine
 * @returns The combined class names
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Get the game data
 * @param props - The game data
 * @param props.leagueId - The league id
 * @param props.gameWeekId - The current game week id
 * @returns The game data
 */
export const getGameData = async ({
  leagueId,
  gameWeekId,
}: {
  leagueId: ILeague['leagueId'];
  gameWeekId: IGameWeek['id'];
}): Promise<IGetGameWeekResults> => {
  const league = await getCurrentLeague(leagueId);

  const weeklyPicksData = await getAllWeeklyPicks({
    leagueId: leagueId,
    weekId: gameWeekId,
  });

  return {
    league: {
      leagueId: league.leagueId,
      leagueName: league.leagueName,
      logo: league.logo,
      participants: league.participants,
      survivors: league.survivors,
    },
    weeklyPicksData: {
      leagueId: leagueId,
      gameWeekId: gameWeekId,
      userResults: weeklyPicksData || {},
    },
  };
};

/**
 * Get the user pic
 * @param props - The user pick
 * @param props.weeklyPicks - The weekly picks
 * @param props.userId - The user id
 * @param props.entryId - The entry id
 * @param props.NFLTeams - The NFL teams
 * @returns The user pick
 */
export const getUserPick = async ({
  weeklyPicks,
  userId,
  entryId,
  NFLTeams,
}: IGetUserPick): Promise<string> => {
  if (!weeklyPicks || !weeklyPicks[userId]) {
    return '';
  }

  const userTeamId = weeklyPicks[userId][entryId].teamName;
  const userSelectedTeam = NFLTeams.find((team) => team.teamName === userTeamId);

  return userSelectedTeam?.teamName || '';
};

/**
 * Parse the user pick
 * @param userId - The user id
 * @param entryId - The entry id
 * @param teamName - The team id
 * @returns {string} The parsed user pick
 */
export const parseUserPick = (
  userId: IUser['id'],
  entryId: IEntry['$id'],
  teamName: string,
): IUserPick => {
  if (!userId || !teamName || !entryId) {
    throw new Error('User ID and Team ID Required');
  }

  const parsedData = JSON.parse(
    `{"${userId}":
      {"${entryId}":
        {
          "teamName": "${teamName}",
          "correct": null
        }
      }
    }`,
  );

  return parsedData;
};

/**
 * Get the list of leagues the user is a part of
 * @param leagues - The list of leagues
 * @returns {Promise<ILeague[]>} The list of leagues the user is a part of
 */
export const getUserLeagues = async (
  leagues: IUser['leagues'],
): Promise<ILeague[]> => {
  if (!leagues || leagues.length === 0) {
    return [];
  }
  const userLeagues = leagues.map((league) => {
    return getCurrentLeague(league);
  });

  return Promise.all(userLeagues);
};

/**
 * Get the user entries
 * @param userId - The user ID
 * @param leagueId - The league ID
 * @returns {IEntry[] | Error} - The list of entries or an error
 */
export const getUserEntries = async (userId: IUser['id'], leagueId: ILeague['leagueId']): Promise<IEntry[]> => {
  return await getCurrentUserEntries(userId, leagueId);
}

/**
 * Returns if the team has already been picked by the user
 * @param teamName - The team name
 * @param selectedTeams - the user's selected teams
 * @returns {boolean} - Whether the team has already been picked
 */
export const hasTeamBeenPicked = (teamName: string, selectedTeams: INFLTeam[]): boolean => {
  return selectedTeams.find((team) => team.teamName === teamName) ? true : false;
}
