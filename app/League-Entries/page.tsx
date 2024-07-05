// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { LeagueEntries } from '@/components/LeagueEntries/LeagueEntries';
import { LeagueSurvivors } from '@/components/LeagueSurvivors/LeagueSurvivors';
import { JSX } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Displays the user's entries for that specific league.
 * @returns {JSX.Element} - Returns a JSX.Element with the name LeaguesEntries.
 */
const LeagueEntriesPage = (): JSX.Element => {
  const router = useRouter();

  /**
   * Handles the button entries by navigating to the specified route.
   * @returns {void} This function does not return a value.
   */
  const handleButtonEntries = (): void => {
    router.push('/league/66311a210039f0532044/entries/1/week/1');
  };

  return (
    <div className="league-entries-container mx-auto max-w-3xl pt-10">
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
        <LeagueEntries entryNumber={1} onClick={handleButtonEntries} />
        <LeagueEntries
          entryNumber={2}
          isPickSet={true}
          onClick={handleButtonEntries}
        />
        <LeagueEntries entryNumber={3} isEliminated={true} />
      </section>
    </div>
  );
};

export default LeagueEntriesPage;
