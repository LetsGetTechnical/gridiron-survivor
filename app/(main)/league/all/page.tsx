// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { ENTRY_URL, LEAGUE_URL } from '@/const/global';
import { getUserLeagues } from '@/utils/utils';
import { LeagueCard } from '@/components/LeagueCard/LeagueCard';
import { useDataStore } from '@/store/dataStore';
import GlobalSpinner from '@/components/GlobalSpinner/GlobalSpinner';
import React, { JSX, useEffect, useState } from 'react';
import { getCurrentUserEntries, getGameWeek } from '@/api/apiFunctions';

/**
 * Renders the leagues component.
 * @returns {JSX.Element} The rendered leagues component.
 */
const Leagues = (): JSX.Element => {
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const { user, leagues, updateLeagues, updateGameWeek, updateEntries } =
    useDataStore((state) => state);

  /**
   * Fetches the user's leagues.
   * @returns {Promise<void>}
   */
  const getLeagues = async (): Promise<void> => {
    try {
      const userLeagues = await getUserLeagues(user.leagues);
      updateLeagues(userLeagues);
    } catch (error) {
      throw new Error('Error fetching user leagues');
    } finally {
      setLoadingData(false);
    }
  };

  /**
   * Fetches entries per league and the current week.
   * @returns {Promise<void>}
   */
  const fetchAdditionalUserData = async (): Promise<void> => {
    try {
      const promises = leagues.map((league) =>
        getCurrentUserEntries(user.id, league.leagueId),
      );
      const entries = await Promise.all(promises);
      const currentWeek = await getGameWeek();
      updateEntries(entries.flat());
      updateGameWeek(currentWeek);
    } catch (error) {
      console.error('Error fetching entries and game week:', error);
      throw new Error('Error fetching entries and game week');
    }
  };

  useEffect(() => {
    if (!user.id || user.id === '') {
      return;
    }

    getLeagues();
  }, [user]);

  useEffect(() => {
    if (leagues.length > 0) {
      fetchAdditionalUserData();
    }
  }, [leagues]);

  return (
    <div className="Leagues mx-auto max-w-3xl pt-10">
      {loadingData ? (
        <GlobalSpinner />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
};

export default Leagues;
