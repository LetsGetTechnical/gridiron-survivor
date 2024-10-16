// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { getAllLeagueEntries } from '@/api/apiFunctions';
import { getUserLeagues } from '@/utils/utils';
import { IEntryWithLeague } from '@/components/TableColumns/TableColumns.interface';
import { JSX, useEffect, useState } from 'react';
import { leagueColumns } from '@/components/TableColumns/TableColumns';
import TableData from '@/components/TableData/TableData';
import { useDataStore } from '@/store/dataStore';

/**
 * Renders the admin page.
 * @returns {JSX.Element} - The rendered Admin Leagues page.
 */
const AdminLeagues = (): JSX.Element => {
  const [leaguesData, setLeaguesData] = useState<IEntryWithLeague[]>([]);
  const { user } = useDataStore((state) => state);

  /**
   * Get all leagues the user is a part of.
   */
  const fetchData = async (): Promise<void> => {
    try {
      const entries = await getAllLeagueEntries({ leagues: user.leagues });
      const leagues = await getUserLeagues(user.leagues);
      const combinedData = leagues.map((league, index) => ({
        aliveEntries: entries[index].alive,
        leagueId: '',
        leagueName: league.leagueName,
        logo: '',
        participants: league.participants,
        survivors: league.survivors,
        totalEntries: entries[index].totalEntries,
      }));
      setLeaguesData(combinedData);
    } catch (error) {
      console.error('Error fetching leagues:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user.leagues]);

  return (
    <section className="grid grid-cols-2 gap-6">
      <TableData columns={leagueColumns} data={leaguesData} />
    </section>
  );
};

export default AdminLeagues;
