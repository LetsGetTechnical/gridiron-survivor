import { IGameWeek, IUser, IWeeklyPicks } from '@/api/IapiFunctions';
import { getAllWeeklyPicks, getCurrentGame, getCurrentLeague } from '@/api/apiFunctions';
import { Models } from 'appwrite/types/models';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { IGetGameData, IGetGameWeekResults, IGetUserPick } from './utils.interface';
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
 * @param userId.userId - The user id
 * @param userId - The user id
 * @param currentGameWeekId - The current game week id
 * @param userId.currentGameWeekId - The current game week id
 * @returns The game data
 */
export const getGameData = async ({
  leagueId,
  currentGameWeekId,
}: {
  leagueId: ILeague['leagueId'];
  currentGameWeekId: IGameWeek['id'];
}) => {
  const league = await getCurrentLeague(leagueId);

  const weeklyPicksData = await getAllWeeklyPicks({
    leagueId: leagueId,
    weekId: currentGameWeekId,
  });

  return {
    league: {
      leagueName: league.leagueName,
      logo: league.logo,
      participants: league.participants,
      survivors: league.survivors,
    },
    weeklyPicksData: {
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

/**
 * Get the list of leagues the user is a part of
 *
 * @return {ILeague | Error}
 */
export const getUserLeagues = async (
  leagues: IUser['league'],
): Promise<ILeague[]> => {
  const userLeagues = leagues.map((league) => {
    return getCurrentLeague(league);
  });

  return Promise.all(userLeagues);
};
