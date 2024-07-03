// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { useCallback } from 'react';
import { getGameData, getUserPick } from './utils';
import { useDataStore } from '@/store/dataStore';
import { UseProcessGameProps } from './utils.interface';

/**
 * Returns a function that processes the game data.
 * @param props - The component props.
 * @param props.leagueId - The league ID.
 * @param props.entryId - The entry ID.
 * @param props.gameWeek - The game week.
 * @param props.user - The user.
 * @param props.NFLTeams - The NFL teams.
 * @param props.setUserPick - The user pick.
 * @returns {void}
 */
const useProcessGame = ({
  leagueId,
  entryId,
  gameWeek,
  user,
  NFLTeams,
  setUserPick,
}: UseProcessGameProps): void => {
  const { updateLeague, updateWeeklyPicks } = useDataStore((state) => state);

  useCallback(async () => {
    const { league, weeklyPicksData } = await getGameData({
      leagueId: leagueId,
      gameWeekId: gameWeek.id,
    });

    if (league && weeklyPicksData) {
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
        entryId: entryId,
        NFLTeams: NFLTeams,
      });

      setUserPick(userPickData);
    }
  }, [leagueId, user.id, gameWeek.id, NFLTeams]);
};

export default useProcessGame;
