// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { LeagueEntries } from '@/components/LeagueEntries/LeagueEntries';
import { LeagueSurvivors } from '@/components/LeagueSurvivors/LeagueSurvivors';
import * as React from 'react';

/**
 * @returns {React.JSX.Element} - Returns a JSX.Element with the name LeaguesEntries that displays the user's entries for that specific league.
 */
const LeaguesEntries: React.FC = (): React.JSX.Element => {
  return (
    <div className="Leagues mx-auto max-w-3xl pt-10">
      <header className="place-items-center space-y-2 pb-10 text-center">
        <h1 className="text-3xl font-bold tracking-tight">
          Windy City Smackdown
        </h1>
        <LeagueSurvivors className="text-xl" survivors={12} totalPlayers={12} />
      </header>
      <section className="grid gap-3">
        <h3 className="text-center text-2xl font-semibold tracking-tight">
          Week 2
        </h3>
        <LeagueEntries entryNumber={1} />
        <LeagueEntries entryNumber={2} isPickSet={true} />
        <LeagueEntries entryNumber={3} isEliminated={true} />
      </section>
    </div>
  );
};

export default LeaguesEntries;
