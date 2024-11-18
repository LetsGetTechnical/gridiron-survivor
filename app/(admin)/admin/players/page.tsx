// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { getAllLeagueEntries } from '@/api/apiFunctions';
import { IPlayerEntryData } from '@/components/TableColumns/PlayerColumns/PlayerColumns.interface';
import { playerColumns } from '@/components/TableColumns/PlayerColumns/PlayerColumns';
import TableData from '@/components/TableData/TableData';
import { JSX, useEffect, useState } from 'react';

/**
 * Renders the admin page.
 * @returns {JSX.Element} - The rendered Admin Players page.
 */
const AdminPlayers = (): JSX.Element => {
  const [entryData, setEntryData] = useState<IPlayerEntryData[]>([]);
  /**
   * Get all entries from the league provided.
   */
  const fetchData = async (): Promise<void> => {
    const data = await getAllLeagueEntries({
      leagueId: '66e1cc9000160b10bf2c',
    });

    setEntryData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section
      className="p-4 max-w-screen-lg"
      data-testid="admin-players-content"
    >
      <TableData columns={playerColumns} data={entryData} />
    </section>
  );
};

export default AdminPlayers;
