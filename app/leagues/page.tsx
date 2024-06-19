// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React, { JSX } from 'react';
import { LeagueCard } from '@/components/LeagueCard/LeagueCard';
import { useDataStore } from '@/store/dataStore';

/**
 * Renders the leagues component.
 * @returns {JSX.Element} The rendered leagues component.
 */
const Leagues = (): JSX.Element => {
  const { gameGroup } = useDataStore((state) => state);

  return (
    <div className="Leagues mx-auto max-w-3xl pt-10">
      <h1 className="pb-10 text-center text-3xl font-bold tracking-tight">
        Your leagues
      </h1>
      <section className="grid gap-6 md:grid-cols-2">
        <LeagueCard
          href="/leagues"
          leagueCardLogo="https://ryanfurrer.com/_astro/logo-dark-theme.CS8e9u7V_JfowQ.svg" // should eventually be something like league.logo
          survivors={gameGroup.survivors.length}
          title="69ers"
          totalPlayers={gameGroup.participants.length}
        />
        <LeagueCard
          isEliminated={true}
          href="/leagues"
          survivors={gameGroup.survivors.length}
          title="69ers"
          totalPlayers={gameGroup.participants.length}
        />

        <LeagueCard
          href="/leagues"
          survivors={gameGroup.survivors.length}
          title="It's Always Sunny in Minneapolis"
          totalPlayers={gameGroup.participants.length}
        />
        <LeagueCard
          href="/leagues"
          survivors={gameGroup.survivors.length}
          title="Windy City Smackdown"
          totalPlayers={gameGroup.participants.length}
        />
        <LeagueCard
          href="/leagues"
          isEliminated={true}
          survivors={gameGroup.survivors.length}
          title="Diamond Dogs"
          totalPlayers={gameGroup.participants.length}
        />
      </section>
    </div>
  );
};

export default Leagues;
