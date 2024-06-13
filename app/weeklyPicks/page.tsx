// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React, { JSX } from 'react';
import { getNFLTeams, getCurrentWeek } from '../../api/apiFunctions';
import WeeklyPicks from './WeeklyPicks';

export const revalidate = 900; // 15 minutes

/**
 * Renders the weekly picks page.
 * @returns {JSX.Element} The rendered weekly picks page.
 */
const Page = async (): Promise<JSX.Element> => {
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
};

export default Page;
