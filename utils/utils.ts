import { IGameWeek, IUser, IWeeklyPicks } from '@/api/IapiFunctions';
import { getAllWeeklyPicks, getCurrentGame } from '@/api/apiFunctions';
import { Models } from 'appwrite/types/models';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getGameData = async ({
  userId,
  currentGameWeekId,
}: {
  userId: IUser['id'];
  currentGameWeekId: IGameWeek['id'];
}) => {
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
