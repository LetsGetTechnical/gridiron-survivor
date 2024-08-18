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
import GlobalSpinner from '@/components/GlobalSpinner/GlobalSpinner';

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
  const [currentWeek, setCurrentWeek] = useState<IGameWeek['week']>(1);
  const [entries, setEntries] = useState<IEntry[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const { user } = useDataStore((state) => state);

  /**
   * Fetches all entries for the current user.
   * @returns {Promise<void>}
   */
  const getAllEntries = async (): Promise<void> => {
    try {
      const getEntries = await getCurrentUserEntries(user.id, leagueId);
      setEntries(getEntries);
    } catch (error) {
      throw new Error("Error fetching user's entries");
    } finally {
      setLoadingData(false);
    }
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
      throw new Error('Error fetching current game week');
    } finally {
      setLoadingData(false);
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
      setEntries((prevEntries) => [...prevEntries, createdEntry]);
    } catch (error) {
      throw new Error('Error adding new entry');
    }
  };

  useEffect(() => {
    getCurrentGameWeek();
    getAllEntries();
  }, [user]);

  return (
    <>
      {loadingData ? (
        <GlobalSpinner />
      ) : (
        <>
          {entries.length > 0 ? (
            <>
              {entries.map((entry) => {
                const linkUrl = `/${LEAGUE_URL}/${leagueId}/${ENTRY_URL}/${entry.$id}/${WEEK_URL}/${currentWeek}`;
                const isPickSet =
                  entry.selectedTeams && entry.selectedTeams.length > 0;

                const teamLogo = isPickSet
                  ? entry.selectedTeams[0].teamLogo
                  : '';

                return (
                  <section key={entry.$id}>
                    <LeagueEntries
                      key={entry.$id}
                      entryName={entry.name}
                      isEliminated={entry.eliminated}
                      isPickSet={isPickSet}
                      linkUrl={linkUrl}
                      teamLogo={teamLogo}
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
          ) : (
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
          )}
        </>
      )}
    </>
  );
};

export default Entry;
