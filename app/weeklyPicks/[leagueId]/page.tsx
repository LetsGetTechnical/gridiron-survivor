import React from 'react';
import { IGameGroup } from '@/api/IapiFunctions';
import WeeklyPicks from './WeeklyPicks';
import { getCurrentWeek, getNFLTeams } from '@/api/apiFunctions';

export default async function Page({
  params,
}: {
  params: { leagueId: IGameGroup['currentGameId'] };
}) {
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
      gameId={params.leagueId}
    />
  );
}
