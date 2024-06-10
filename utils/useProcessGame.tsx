import { useCallback } from 'react';
import { getGameData, getUserPick } from './utils';
import { useDataStore } from '@/store/dataStore';

interface UseProcessGameProps {
  leagueId: string;
  gameWeek: { id: string };
  user: { id: string };
  NFLTeams: any; // Define this type based on your actual data structure
  setUserPick: (data: any) => void; // Define this type based on your actual data structure
}

const useProcessGame = ({
  leagueId,
  gameWeek,
  user,
  NFLTeams,
  setUserPick,
}: UseProcessGameProps) => {
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
  }, [user.id, gameWeek.id, NFLTeams, setUserPick]);

  return processGame;
};

export default useProcessGame;
