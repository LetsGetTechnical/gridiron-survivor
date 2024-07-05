// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import {
  IGameWeek,
  IUser,
  IUserPick,
} from '@/api/apiFunctions.interface';
import { getAllWeeklyPicks, getCurrentLeague } from '@/api/apiFunctions';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import {
  IGetGameWeekResults,
  IGetUserPick,
} from './utils.interface';
import { ILeague } from '@/api/apiFunctions.interface';

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
 * @param props.currentGameWeekId - The current game week id
 * @returns The game data
 */
export const getGameData = async ({
  leagueId,
  currentGameWeekId,
}: {
  leagueId: ILeague['leagueId'];
  currentGameWeekId: IGameWeek['id'];
}): Promise<IGetGameWeekResults> => {
  const league = await getCurrentLeague(leagueId);

  const weeklyPicksData = await getAllWeeklyPicks({
    leagueId: leagueId,
    weekId: currentGameWeekId,
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
      gameWeekId: currentGameWeekId,
      userResults: weeklyPicksData,
    },
  };
};

/**
 * Get the user pic
 * @param props - The user pick
 * @param props.weeklyPicks - The weekly picks
 * @param props.userId - The user id
 * @param props.NFLTeams - The NFL teams
 * @returns The user pick
 */
export const getUserPick = async ({
  weeklyPicks,
  userId,
  NFLTeams,
}: IGetUserPick): Promise<string> => {
  if (!weeklyPicks || !weeklyPicks[userId]) {
    return '';
  }

  const userTeamId = weeklyPicks[userId].team;
  const userSelectedTeam = NFLTeams.find((team) => team.teamId === userTeamId);

  return userSelectedTeam?.teamName || '';
};

/**
 * Parse the user pick
 * @param userId - The user id
 * @param teamId - The team id
 * @returns {string} The parsed user pick
 */
export const parseUserPick = (
  userId: IUser['id'],
  teamId: string,
): IUserPick => {
  if (!userId || !teamId || teamId === '') {
    throw new Error('User ID and Team ID Required');
  }

  const parsedData = JSON.parse(
    `{"${userId}":{"team":"${teamId}","correct":true}}`,
  );

  return parsedData;
};

/**
 * Get the list of leagues the user is a part of
 * @param leagues - The list of leagues
 * @returns {ILeague | Error} - The list of leagues
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
