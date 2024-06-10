import { ILeague, IGameWeek, IUser, IWeeklyPicks } from '@/api/IapiFunctions';
import { getAllWeeklyPicks, getCurrentLeague } from '@/api/apiFunctions';
import { Models } from 'appwrite/types/models';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
      participants: league.participants,
      survivors: league.survivors,
    },
    weeklyPicksData: {
      gameWeekId: currentGameWeekId,
      userResults: weeklyPicksData,
    },
  };
};

export const getUserPick = async ({
  weeklyPicks,
  userId,
  NFLTeams,
}: {
  weeklyPicks: IWeeklyPicks['userResults'];
  userId: IUser['id'];
  NFLTeams: Models.Document[];
}) => {
  if (!weeklyPicks || !weeklyPicks[userId]) return '';

  const userTeamId = weeklyPicks[userId].team;
  const userSelectedTeam = NFLTeams.find((team) => team.$id === userTeamId);

  return userSelectedTeam?.teamName || '';
};

export const parseUserPick = (userId: IUser['id'], teamId: string) => {
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