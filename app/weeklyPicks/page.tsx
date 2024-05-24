import {
  getNFLTeams,
  getAllWeeklyPicks,
  getAllGameGroups,
  getCurrentWeek,
} from '../../api/apiFunctions';
import WeeklyPicks from './WeeklyPicks';

export default async function Page() {
  const allWeeklyPicks = getAllWeeklyPicks();
  const allNFLTeams = getNFLTeams();
  const allGameGroups = getAllGameGroups();
  const allGameWeeks = getCurrentWeek();

  const [allPicksData, nflTeamsData, allGameGroupsData, allGameWeeksData] =
    await Promise.all([
      allWeeklyPicks,
      allNFLTeams,
      allGameGroups,
      allGameWeeks,
    ]);

  return (
    <WeeklyPicks
      weeklyPicksData={allPicksData}
      NFLTeams={nflTeamsData.documents}
      gameGroupsData={allGameGroupsData}
      gameWeeksData={allGameWeeksData}
    />
  );
}
