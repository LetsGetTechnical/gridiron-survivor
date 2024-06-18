// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { useCallback } from 'react';
import { getGameData, getUserPick } from './utils';
import { useDataStore } from '@/store/dataStore';
import { INFLTeam } from '@/api/apiFunctions.interface';

interface UseProcessGameProps {
  leagueId: string;
  gameWeek: { id: string };
  user: { id: string };
  NFLTeams: INFLTeam[];
  setUserPick: (data: string) => void; // eslint-disable-line
}

/**
 * Returns a function that processes the game data.
 * @param props - The component props.
 * @param props.leagueId - The league ID.
 * @param props.gameWeek - The game week.
 * @param props.user - The user.
 * @param props.NFLTeams - The NFL teams.
 * @param props.setUserPick - The user pick.
 * @returns
 */
const useProcessGame = ({
  leagueId,
  gameWeek,
  user,
  NFLTeams,
  setUserPick,
}: UseProcessGameProps): (() => Promise<void>) => {
  const { updateLeague, updateWeeklyPicks } = useDataStore((state) => state);

  const processGame = useCallback(async () => {
    const { league, weeklyPicksData } = await getGameData({
      leagueId: leagueId,
      currentGameWeekId: gameWeek.id,
    });

    if (!league || !weeklyPicksData) {
      console.error('Error getting game data');
      return;
    }

    updateLeague({
      leagueId: leagueId,
      leagueName: league.leagueName,
      logo: league.logo,
      participants: league.participants,
      survivors: league.survivors,
    });

    updateWeeklyPicks({
      leagueId: leagueId,
      gameWeekId: gameWeek.id,
      userResults: weeklyPicksData.userResults,
    });

    const userPickData = await getUserPick({
      weeklyPicks: weeklyPicksData.userResults,
      userId: user.id,
      NFLTeams: NFLTeams,
    });

    setUserPick(userPickData);
  }, [leagueId, user.id, gameWeek.id, NFLTeams]); // eslint-disable-line

  return processGame;
};

export default useProcessGame;
