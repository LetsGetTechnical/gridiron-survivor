// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import React, { JSX, useEffect, useState } from 'react';
import { LeagueCard } from '@/components/LeagueCard/LeagueCard';
import { ILeague } from '@/api/apiFunctions.interface';
import { getUserLeagues } from '@/utils/utils';
import { useDataStore } from '@/store/dataStore';
import { ENTRY_URL, LEAGUE_URL } from '@/const/global';

/**
 * Renders the leagues component.
 * @returns {JSX.Element} The rendered leagues component.
 */
const Leagues = (): JSX.Element => {
  const [leagues, setLeagues] = useState<ILeague[]>([]);
  const { user } = useDataStore((state) => state);

  /**
   * Fetches the user's leagues.
   * @returns {Promise<void>}
   */
  const getLeagues = async (): Promise<void> => {
    try {
      const userLeagues = await getUserLeagues(user.leagues);
      setLeagues(userLeagues);
    } catch (error) {}
  };

  useEffect(() => {
    if (!user.id || user.id === '') {
      return;
    }

    getLeagues();
  }, [user]);

  return (
    <div className="Leagues mx-auto max-w-3xl pt-10">
      <h1 className="pb-10 text-center text-3xl font-bold tracking-tight">
        Your leagues
      </h1>
      <section className="grid gap-6 md:grid-cols-2">
        {leagues.length > 0 ? (
          leagues.map((league) => (
            <LeagueCard
              key={league.leagueId}
              href={`/${LEAGUE_URL}/${league.leagueId}/${ENTRY_URL}/all`}
              leagueCardLogo="https://ryanfurrer.com/_astro/logo-dark-theme.CS8e9u7V_JfowQ.svg" // should eventually be something like league.logo
              survivors={league.survivors.length}
              title={league.leagueName}
              totalPlayers={league.participants.length}
            />
          ))
        ) : (
          <div className="text-center">
            <p className="text-lg font-bold">
              You are not enrolled in any leagues
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Leagues;