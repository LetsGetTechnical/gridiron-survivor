// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { getCurrentUserEntries } from '@/api/apiFunctions';
import { useDataStore } from '@/store/dataStore';
import React, { JSX, useEffect, useState } from 'react';
import { IEntry } from '../Entries.interface';
import { LeagueEntries } from '@/components/LeagueEntries/LeagueEntries';
import { ENTRY_URL, LEAGUE_URL, WEEK_URL } from '@/const/global';

/**
 * Display all entries for a league.
 * @param {string} leagueId - The league id.
 * @returns {JSX.Element} The rendered entries component.
 */
const Entry = ({
  params: { leagueId },
}: {
  params: { leagueId: string };
}): JSX.Element => {
  const [entries, setEntries] = useState<IEntry[]>([]);
  const { user } = useDataStore((state) => state);

  /**
   * Fetches all entries for the current user.
   * @returns {Promise<void>}
   */
  const getAllEntries = async (): Promise<void> => {
    const getEntries = await getCurrentUserEntries(user.id, leagueId);
    setEntries(getEntries);
  };

  useEffect(() => {
    if (!user.id || user.id === '') {
      return;
    }

    getAllEntries();
  }, [user]);

  return (
    <>
      {entries.map((entry) => {
        const linkUrl = `/${LEAGUE_URL}/${leagueId}/${ENTRY_URL}/${entry.id}/${WEEK_URL}/1`;

        return (
          <LeagueEntries
            key={entry.id}
            entryName={entry.name}
            linkUrl={linkUrl}
          />
        );
      })}
    </>
  );
};

export default Entry;
