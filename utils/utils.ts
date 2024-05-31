import {
  IGameGroup,
  IGameWeek,
  IUser,
  IWeeklyPicks,
} from '@/api/IapiFunctions';
import { getAllWeeklyPicks, getCurrentGame } from '@/api/apiFunctions';
import { Models } from 'appwrite/types/models';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getGameData = async ({
  gameId,
  currentGameWeekId,
}: {
  gameId: IGameGroup['currentGameId'];
  currentGameWeekId: IGameWeek['id'];
}) => {
  const game = await getCurrentGame(gameId);

  const weeklyPicksData = await getAllWeeklyPicks({
    gameId: gameId,
    weekId: currentGameWeekId,
  });

  return {
    gameGroupData: {
      participants: game.participants,
      survivors: game.survivors,
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
