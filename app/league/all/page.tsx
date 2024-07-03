// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import React, { JSX, useEffect, useState } from 'react';
import { LeagueCard } from '@/components/LeagueCard/LeagueCard';
import { IGameWeek, ILeague } from '@/api/apiFunctions.interface';
import { getUserLeagues } from '@/utils/utils';
import { useDataStore } from '@/store/dataStore';
import { getGameWeek } from '@/api/apiFunctions';

/**
 * Renders the leagues component.
 * @returns {JSX.Element} The rendered leagues component.
 */
const Leagues = (): JSX.Element => {
  const [leagues, setLeagues] = useState<ILeague[]>([]);
  const [currentWeek, setCurrentWeek] = useState<IGameWeek['week']>(1);
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

  /**
   * Fetches the current game week.
   * @returns {Promise<void>}
   */
  const getCurrentGameWeek = async (): Promise<void> => {
    try {
      const currentWeek = await getGameWeek();
      setCurrentWeek(currentWeek.week);
    } catch (error) {}
  };

  useEffect(() => {
    getLeagues();
    getCurrentGameWeek();
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
              href={`/league/${league.leagueId}/entries/1/week/${currentWeek}`}
              leagueCardLogo="https://ryanfurrer.com/_astro/logo-dark-theme.CS8e9u7V_JfowQ.svg" // should eventually be something like league.logo
              survivors={league.survivors.length}
              title={league.leagueName}
              totalPlayers={league.participants.length}
            />
          ))
        ) : (
          <div className="text-center">
            <p className="text-lg font-bold">Loading ...</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Leagues;
