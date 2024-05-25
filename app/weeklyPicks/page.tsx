import { getNFLTeams, getCurrentWeek } from '../../api/apiFunctions';
import WeeklyPicks from './WeeklyPicks';

export default async function Page() {
  const allNFLTeams = getNFLTeams();
  const currentGameWeek = getCurrentWeek();

  const [nflTeamsData, currentGameWeekData] = await Promise.all([
    allNFLTeams,
    currentGameWeek,
  ]);

  return (
    <WeeklyPicks
      NFLTeams={nflTeamsData}
      currentGameWeek={currentGameWeekData}
    />
  );
}
