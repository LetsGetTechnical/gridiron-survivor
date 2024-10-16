// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { JSX, useEffect, useState } from 'react';
import TableData from '@/components/TableData/TableData';
import { leagueColumns } from '@/components/TableColumns/TableColumns';
import { useDataStore } from '@/store/dataStore';
import { getUserLeagues } from '@/utils/utils';
import { getAllLeagueEntries } from '@/api/apiFunctions';
import { IEntryWithLeague } from '@/components/TableColumns/TableColumns';

/**
 * Renders the admin page.
 * @returns {JSX.Element} - The rendered Admin Leagues page.
 */
const AdminLeagues = (): JSX.Element => {
  const { user } = useDataStore((state) => state);
  const [leaguesData, setLeaguesData] = useState<IEntryWithLeague[]>([]);

  /**
   * Get all leagues the user is a part of.
   */
  const fetchData = async (): Promise<void> => {
    try {
      const leagues = await getUserLeagues(user.leagues);
      const entries = await getAllLeagueEntries({ leagues: user.leagues });
      const combinedData = leagues.map((league, index) => ({
        leagueId: '',
        logo: '',
        leagueName: league.leagueName,
        participants: league.participants,
        survivors: league.survivors,
        totalEntries: entries[index].totalEntries,
        aliveEntries: entries[index].alive,
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
