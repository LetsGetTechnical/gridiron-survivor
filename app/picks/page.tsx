// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React, { JSX } from 'react';
import { ILeague } from '@/api/apiFunctions.interface';
import WeeklyPicks from './WeeklyPicks';
import { getGameWeek, getNFLTeams } from '@/api/apiFunctions';

interface Props {
  searchParams?: { leagueId: ILeague['leagueId'] };
}

/**
 * Renders the picks page.
 * @param {Props} props The props for the picks page.
 * @returns {JSX.Element} The rendered picks page.
 */
const Picks = async ({ searchParams }: Props): Promise<JSX.Element> => {
  const leagueId = searchParams?.leagueId || '';
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
};

export default Picks;
