import {
  getNFLTeams,
  getAllWeeklyPicks,
  getAllGameGroups,
} from '../../api/apiFunctions';
import WeeklyPicks from './WeeklyPicks';

export default async function Page() {
  const allWeeklyPicks = getAllWeeklyPicks();
  const allNFLTeams = getNFLTeams();
  const allGameGroups = getAllGameGroups();

  const [allPicksData, nflTeamsData, allGameGroups] = await Promise.all([
    allWeeklyPicks,
    allNFLTeams,
    allGameGroups,
  ]);

  return (
    <WeeklyPicks
      weeklyPicksData={allPicksData}
      NFLTeams={nflTeamsData.documents}
      allGameGroupsData={allGameGroups}
    />
  );
}
