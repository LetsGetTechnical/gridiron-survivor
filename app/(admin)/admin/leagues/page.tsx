// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { JSX } from 'react';
import { LeagueCard } from '@/components/LeagueCard/LeagueCard';

/**
 * Renders the admin page.
 * @returns {JSX.Element} - The rendered Admin Leagues page.
 */
const AdminLeagues = (): JSX.Element => {
  return (
    <section className="grid grid-cols-2 gap-6">
      <LeagueCard
        href={'#'}
        survivors={20}
        title={'Demo League 1'}
        totalPlayers={30}
      />
      <LeagueCard
        href={'#'}
        survivors={20}
        title={'Demo League 2'}
        totalPlayers={30}
      />
      <LeagueCard
        href={'#'}
        survivors={20}
        title={'Demo League 3'}
        totalPlayers={30}
      />
    </section>
  );
};

export default AdminLeagues;
