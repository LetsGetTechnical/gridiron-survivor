// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import { ENTRY_URL, LEAGUE_URL } from '@/const/global';
import { getUserLeagues } from '@/utils/utils';
import { ILeague } from '@/api/apiFunctions.interface';
import { JoinLeagueCard } from '@/components/JoinLeagueCard/JoinLeagueCard';
import { LeagueCard } from '@/components/LeagueCard/LeagueCard';
import { useDataStore } from '@/store/dataStore';
import GlobalSpinner from '@/components/GlobalSpinner/GlobalSpinner';
import React, { JSX, useEffect, useState } from 'react';
import Heading from '@/components/Heading/Heading';
import { Button } from '@/components/Button/Button';

/**
 * Renders the leagues component.
 * @returns {JSX.Element} The rendered leagues component.
 */
const Leagues = (): JSX.Element => {
  const [leagues, setLeagues] = useState<ILeague[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const { user } = useDataStore((state) => state);

  /**
   * Fetches the user's leagues.
   * @returns {Promise<void>}
   */
  const getLeagues = async (): Promise<void> => {
    try {
      const userLeagues = await getUserLeagues(user.leagues);
      setLeagues(userLeagues);
    } catch (error) {
      throw new Error('Error fetching user leagues');
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (!user.id || user.id === '') {
      return;
    }

    getLeagues();
  }, [user]);

  return (
    <div className="Leagues mx-auto max-w-3xl pt-10">
      {loadingData ? (
        <GlobalSpinner />
      ) : (
        <>
          <section className="mb-24">
            <Heading as="h1" className="text-center mb-10">
              Your Leagues
            </Heading>
            <div>
              {leagues.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {leagues.map((league) => (
                    <LeagueCard
                      key={league.leagueId}
                      href={`/${LEAGUE_URL}/${league.leagueId}/${ENTRY_URL}/all`}
                      leagueCardLogo="https://ryanfurrer.com/_astro/logo-dark-theme.CS8e9u7V_JfowQ.svg" // should eventually be something like league.logo
                      survivors={league.survivors.length}
                      title={league.leagueName}
                      totalPlayers={league.participants.length}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center mx-auto">
                  <p className="text-lg">
                    You are not enrolled in any leagues.
                  </p>
                  <p className="text-lg">
                    Join a league below or create your own!
                  </p>
                  <Button
                    className="mt-6"
                    onClick={() => {
                      /* Add your create league logic here */
                    }}
                    label="Create your League"
                  />
                </div>
              )}
            </div>
          </section>
          <section>
            <Heading as="h2" className="text-center mb-10">
              Join a League
            </Heading>
            <div className="grid gap-6">
              <JoinLeagueCard title="League 1" totalPlayers={12} />
              <JoinLeagueCard title="League 2" totalPlayers={20} />
              <JoinLeagueCard title="League 3" totalPlayers={8} />
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Leagues;
