import { getNFLTeams, getCurrentWeek } from '../../api/apiFunctions';
import WeeklyPicks from './WeeklyPicks';

export const revalidate = 900; // 15 minutes

const Page = async () => {
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

export default Page;
