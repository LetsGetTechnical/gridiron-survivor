// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import { getCurrentUserEntries, getGameWeek } from '@/api/apiFunctions';
import { useDataStore } from '@/store/dataStore';
import React, { JSX, useEffect, useState } from 'react';
import { IEntry } from '../Entries.interface';
import { LeagueEntries } from '@/components/LeagueEntries/LeagueEntries';
import { ENTRY_URL, LEAGUE_URL, WEEK_URL } from '@/const/global';
import { IGameWeek } from '@/api/apiFunctions.interface';

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
  const [currentWeek, setCurrentWeek] = useState<IGameWeek['week']>(1);
  const { user } = useDataStore((state) => state);

  /**
   * Fetches all entries for the current user.
   * @returns {Promise<void>}
   */
  const getAllEntries = async (): Promise<void> => {
    const getEntries = await getCurrentUserEntries(user.id, leagueId);
    setEntries(getEntries);
  };

  /**
   * Fetches the current game week.
   * @returns {Promise<void>}
   */
  const getCurrentGameWeek = async (): Promise<void> => {
    try {
      const currentWeek = await getGameWeek();
      setCurrentWeek(currentWeek.week);
    } catch (error) {}
  };

  useEffect(() => {
    if (!user.id || user.id === '') {
      return;
    }

    getCurrentGameWeek();
    getAllEntries();
  }, [user]);

  return (
    <>
      {entries.map((entry) => {
        const linkUrl = `/${LEAGUE_URL}/${leagueId}/${ENTRY_URL}/${entry.$id}/${WEEK_URL}/${currentWeek}`;

        return (
          <LeagueEntries
            key={entry.$id}
            entryName={entry.name}
            linkUrl={linkUrl}
          />
        );
      })}
    </>
  );
};

export default Entry;
