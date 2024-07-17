// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React, { JSX } from 'react';
import { getNFLTeams } from '@/api/apiFunctions';
import { IWeekParams } from '../Week.interface';
import Week from '../Week';

/**
 * Renders the picks page.
 * @param {IWeekParams} props The props for the picks page.
 * @returns {JSX.Element} The rendered picks page.
 */
const WeekServer = async ({
  params: { leagueId, entryId, weekId },
}: IWeekParams): Promise<JSX.Element> => {
  const allNFLTeams = await getNFLTeams();

  return (
    <Week
      entry={entryId}
      league={leagueId}
      NFLTeams={allNFLTeams}
      week={weekId}
    />
  );
};

export default WeekServer;
