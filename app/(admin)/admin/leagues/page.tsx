// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { JSX } from 'react';
import { LeagueCard } from '@/components/LeagueCard/LeagueCard';
import AdminRootLayout from '../../layout';

/**
 * Renders the admin page.
 * @returns {JSX.Element} - The rendered Admin Leagues page.
 */
const AdminLeagues = (): JSX.Element => {
  return (
    <AdminRootLayout
      pageTitle="Leagues"
      pageDescription="Manage all of the leagues you are the admin for"
    >
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
    </AdminRootLayout>
  );
};

export default AdminLeagues;
