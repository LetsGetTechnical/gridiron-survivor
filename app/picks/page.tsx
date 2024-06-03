import React from 'react';
import { ILeague } from '@/api/IapiFunctions';
import WeeklyPicks from './WeeklyPicks';
import { getGameWeek, getNFLTeams } from '@/api/apiFunctions';

interface Props {
  searchParams: { leagueId: ILeague['leagueId'] };
}

export default async function Page({ searchParams }: Props) {
  const leagueId = searchParams.leagueId;
  const allNFLTeams = getNFLTeams();
  const currentGameWeek = getGameWeek();

  const [nflTeamsData, currentGameWeekData] = await Promise.all([
    allNFLTeams,
    currentGameWeek,
  ]);

  return (
    <WeeklyPicks
      NFLTeams={nflTeamsData}
      currentGameWeek={currentGameWeekData}
      leagueId={leagueId}
    />
  );
}
