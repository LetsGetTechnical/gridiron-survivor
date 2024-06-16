// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React, { JSX } from 'react';
import { LeagueCard } from '@/components/LeagueCard/LeagueCard';
import { IUser } from '@/api/apiFunctions.interface';
import { getCurrentUser } from '@/api/apiFunctions';
import { getUserLeagues } from '@/utils/utils';

interface Props {
  searchParams?: { id: IUser['id'] };
}

/**
 * Renders the leagues component.
 * @returns {JSX.Element | undefined} The rendered leagues component.
 */
const Leagues = async ({
  searchParams,
}: Props): Promise<JSX.Element | undefined> => {
  const userId = searchParams?.id || '';

  if (!userId || userId === '') {
    return;
  }

  const userData: IUser = await getCurrentUser(userId);
  const leagueData = await getUserLeagues(userData.league);

  return (
    <div className="Leagues mx-auto max-w-3xl pt-10">
      <h1 className="pb-10 text-center text-3xl font-bold tracking-tight">
        Your leagues
      </h1>
      <section className="grid gap-6 md:grid-cols-2">
        {leagueData.map((league) => (
          <LeagueCard
            key={league.leagueId}
            href={`/picks?leagueId=${league.leagueId}`}
            leagueCardLogo="https://ryanfurrer.com/_astro/logo-dark-theme.CS8e9u7V_JfowQ.svg" // should eventually be something like league.logo
            survivors={league.survivors.length}
            title={league.leagueName}
            totalPlayers={league.participants.length}
          />
        ))}
      </section>
    </div>
  );
};

export default Leagues;
