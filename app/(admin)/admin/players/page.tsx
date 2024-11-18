// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { getAllLeagueEntries } from '@/api/apiFunctions';
import { IPlayerEntryData } from '@/components/TableColumns/LeagueColumns/LeagueColumns.interface';
import TableData from '@/components/TableData/TableData';
import { JSX, useEffect, useState } from 'react';

/**
 * Renders the admin page.
 * @returns {JSX.Element} - The rendered Admin Players page.
 */
const AdminPlayers = (): JSX.Element => {
  const [playerEntryData, setPlayerEntryData] = useState<IPlayerEntryData[]>(
    [],
  );
  /**
   * Get all entries from the league provided.
   */
  const fetchData = async (): Promise<void> => {
    const entryData = await getAllLeagueEntries({
      leagueId: '66e1cc9000160b10bf2c',
    });

    setPlayerEntryData(entryData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section
      className="p-4 max-w-screen-lg"
      data-testid="admin-players-content"
    >
      <TableData columns={} data={playerEntryData} />
    </section>
  );
};

export default AdminPlayers;
