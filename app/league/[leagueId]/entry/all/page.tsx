// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import {
  createEntry,
  getCurrentUserEntries,
  getGameWeek,
} from '@/api/apiFunctions';
import { useDataStore } from '@/store/dataStore';
import React, { JSX, useEffect, useState } from 'react';
import { IEntry, IEntryProps } from '../Entries.interface';
import { LeagueEntries } from '@/components/LeagueEntries/LeagueEntries';
import { ENTRY_URL, LEAGUE_URL, WEEK_URL } from '@/const/global';
import { IGameWeek } from '@/api/apiFunctions.interface';
import { Button } from '@/components/Button/Button';
import { PlusCircle } from 'lucide-react';

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
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Adds a new entry to the league.
   * @param {IEntryProps} props - The entry properties.
   * @param {string} props.name - The name of the entry.
   * @param {string} props.user - The user id.
   * @param {string} props.league - The league id.
   * @returns {void}
   */
  const addNewEntry = async ({
    name,
    user,
    league,
  }: IEntryProps): Promise<void> => {
    try {
      const createdEntry = await createEntry({ name, user, league });
      setEntries([...entries, createdEntry]);
    } catch (error) {
      console.error(error);
    }
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
          <section key={entry.$id}>
            <LeagueEntries
              key={entry.$id}
              entryName={entry.name}
              linkUrl={linkUrl}
              isEliminated={entry.eliminated}
            />
          </section>
        );
      })}

      <div className="flex justify-center items-center mt-2 mb-2 w-full">
        <Button
          icon={<PlusCircle className="mr-2" />}
          variant="outline"
          onClick={() =>
            addNewEntry({
              name: `Entry ${entries.length + 1}`,
              user: user.id,
              league: leagueId,
            })
          }
        >
          Add New Entry
        </Button>
      </div>
    </>
  );
};

export default Entry;
