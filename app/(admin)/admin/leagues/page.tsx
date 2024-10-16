// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { JSX, useEffect, useState } from 'react';
import TableData from '@/components/TableData/TableData';
import { leagueColumns } from '@/components/TableColumns/TableColumns';
import { useDataStore } from '@/store/dataStore';
import { getLeagueEntries, getUserLeagues } from '@/utils/utils';
import { ILeague } from '@/api/apiFunctions.interface';
import { getAllLeagueEntries } from '@/api/apiFunctions';

/**
 * Renders the admin page.
 * @returns {JSX.Element} - The rendered Admin Leagues page.
 */
const AdminLeagues = (): JSX.Element => {
  const { user } = useDataStore((state) => state);
  const [leaguesData, setLeaguesData] = useState<ILeague[]>([]);

  /**
   * Get all leagues the user is a part of.
   */
  const fetchData = async (): Promise<void> => {
    try {
      const leagues = await getUserLeagues(user.leagues);
      const entries = await getAllLeagueEntries({ leagues: user.leagues });
      const combinedData = leagues.map((league, index) => ({
        leagueName: league.leagueName,
        participants: league.participants,
        survivors: league.survivors,
        entries: entries[index], // Corresponding entry data
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
