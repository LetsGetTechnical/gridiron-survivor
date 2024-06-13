// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { IUser, IUserPick } from '@/api/apiFunctions.interface';
import { getAllWeeklyPicks, getCurrentGame } from '@/api/apiFunctions';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { IGetGameData, IGetGameWeekResults, IGetUserPick } from './utils.interface';

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
 * @param userId.userId - The user id
 * @param userId - The user id
 * @param currentGameWeekId - The current game week id
 * @param userId.currentGameWeekId - The current game week id
 * @returns The game data
 */
export const getGameData = async ({
  userId,
  currentGameWeekId,
}: IGetGameData): Promise<IGetGameWeekResults> => {
  // find the game group the user is in
  const game = await getCurrentGame(userId);

  if (!game) {
    return {
      gameGroupData: null,
      weeklyPicksData: '',
    };
  }

  const weeklyPicksData = await getAllWeeklyPicks({
    gameId: game.$id,
    weekId: currentGameWeekId,
  });

  return {
    gameGroupData: {
      currentGameId: game.$id,
      participants: game.participants,
      survivors: game.survivors,
    },
    weeklyPicksData: {
      gameId: game.$id,
      gameWeekId: currentGameWeekId,
      userResults: weeklyPicksData,
    },
  };
};

/**
 * Get the user pick
 * @param weeklyPicks.weeklyPicks - The weekly picks
 * @param weeklyPicks - The weekly picks
 * @param userId - The user id
 * @param NFLTeams - The NFL teams
 * @param weeklyPicks.userId - The user id
 * @param weeklyPicks.NFLTeams - The NFL teams
 * @returns The user pick
 */
export const getUserPick = async ({
  weeklyPicks,
  userId,
  NFLTeams,
}: IGetUserPick): Promise<string> => {
  if (!weeklyPicks || !weeklyPicks[userId]) {return '';}

  const userTeamId = weeklyPicks[userId].team;
  const userSelectedTeam = NFLTeams.find((team) => team.$id === userTeamId);

  return userSelectedTeam?.teamName || '';
};

/**
 * Parse the user pick
 * @param userId - The user id
 * @param teamId - The team id
 * @returns {string} The parsed user pick
 */
export const parseUserPick = (userId: IUser['id'], teamId: string): IUserPick => {
  if (!userId || !teamId || teamId === '') {
    throw new Error('User ID and Team ID Required');
  }

  const parsedData = JSON.parse(
    `{"${userId}":{"team":"${teamId}","correct":true}}`,
  );

  return parsedData;
};
