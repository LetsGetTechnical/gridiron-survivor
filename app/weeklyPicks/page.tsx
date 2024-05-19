import { getNFLTeams, getAllWeeklyPicks } from '../../api/apiFunctions';
import WeeklyPicks from './WeeklyPicks';

export default async function Page() {
  const allWeeklyPicks = getAllWeeklyPicks();
  const allNFLTeams = getNFLTeams();

  const [allPicksData, nflTeamsData] = await Promise.all([
    allWeeklyPicks,
    allNFLTeams,
  ]);

  return (
    <WeeklyPicks
      weeklyPicksData={allPicksData}
      NFLTeams={nflTeamsData.documents}
    />
  );
}
