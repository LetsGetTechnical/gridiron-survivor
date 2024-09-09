// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import {
  createEntry,
  getCurrentLeague,
  getCurrentUserEntries,
  getGameWeek,
  getNFLTeams,
} from '@/api/apiFunctions';
import { Button } from '@/components/Button/Button';
import { ChevronLeft, PlusCircle } from 'lucide-react';
import { ENTRY_URL, LEAGUE_URL, WEEK_URL } from '@/const/global';
import { IEntry, IEntryProps } from '../Entries.interface';
import { LeagueEntries } from '@/components/LeagueEntries/LeagueEntries';
import { LeagueSurvivors } from '@/components/LeagueSurvivors/LeagueSurvivors';
import { useDataStore } from '@/store/dataStore';
import GlobalSpinner from '@/components/GlobalSpinner/GlobalSpinner';
import Heading from '@/components/Heading/Heading';
import Link from 'next/link';
import React, { JSX, useEffect, useState } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner/LoadingSpinner';
import { cn } from '@/utils/utils';
import LinkCustom from '@/components/LinkCustom/LinkCustom';

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
  const [leagueName, setLeagueName] = useState<string>('');
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [addingEntry, setAddingEntry] = useState<boolean>(false);
  const [survivors, setSurvivors] = useState<number>(0);
  const [totalPlayers, setTotalPlayers] = useState<number>(0);
  const { currentWeek, NFLTeams, user, updateCurrentWeek, updateNFLTeams } =
    useDataStore((state) => state);
  const MAX_ENTRIES = 5;

  useEffect(() => {
    /**
     * Fetches the current league name.
     * @returns {Promise<void>}
     * @throws {Error} - An error occurred fetching the league name.
     */
    const getCurrentLeagueName = async (): Promise<void> => {
      try {
        const league = await getCurrentLeague(leagueId);
        setLeagueName(league.leagueName);
        setSurvivors(league.survivors.length);
        setTotalPlayers(league.participants.length);
      } catch (error) {
        throw new Error(`Error fetching league name: ${error}`);
      }
    };

    getCurrentLeagueName();
  }, []);

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
      const getCurrentWeek = await getGameWeek();
      updateCurrentWeek(getCurrentWeek.week);
    } catch (error) {
      throw new Error('Error fetching current game week');
    } finally {
      setLoadingData(false);
    }
  };

  /**
   * Fetches all NFL teams.
   * @returns {Promise<INFLTeam[]>} - The NFL teams.
   */
  const getAllNFLTeams = async (): Promise<void> => {
    try {
      const NFLTeams = await getNFLTeams();
      updateNFLTeams(NFLTeams);
    } catch (error) {
      throw new Error('Error getting NFL teams');
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
    if (entries.length >= MAX_ENTRIES) {
      return;
    }
    setAddingEntry(true);
    try {
      const createdEntry = await createEntry({ name, user, league });
      setEntries((prevEntries) => [...prevEntries, createdEntry]);
    } catch (error) {
      throw new Error('Error adding new entry');
    } finally {
      setAddingEntry(false);
    }
  };

  useEffect(() => {
    if (!user.id || user.id === '') {
      return;
    }

    getCurrentGameWeek();
    getAllEntries();
    getAllNFLTeams();
  }, [user]);

  return (
    <>
      {loadingData ? (
        <GlobalSpinner />
      ) : (
        <div className="mx-auto max-w-3xl pt-10">
          <header data-testid="entry-page-header">
            <div data-testid="entry-page-header-to-leagues-link">
              <LinkCustom
                className="no-underline hover:underline text-primary flex gap-3 items-center font-semibold text-xl"
                href={`/league/all`}
              >
                <ChevronLeft />
                Your Leagues
              </LinkCustom>
            </div>
            <div
              className="entry-page-header-main flex flex-col justify-between text-center gap-10 pt-6 pb-4"
              data-testid="entry-page-header-main"
            >
              <div className="entry-page-header-league-name-and-survivors flex flex-col gap-3">
                <Heading
                  as="h2"
                  className="text-4xl font-bold"
                  data-testid="entry-page-header-league-name"
                >
                  {leagueName}
                </Heading>
                <LeagueSurvivors
                  className="text-lg font-semibold"
                  survivors={survivors}
                  totalPlayers={totalPlayers}
                />
              </div>
              <Heading
                as="h3"
                className="text-2xl leading-8 font-semibold"
                data-testid="entry-page-header-current-week"
              >
                Week {currentWeek}
              </Heading>
            </div>
          </header>

          <section className="flex flex-col gap-3">
            {entries.length > 0 &&
              entries.map((entry) => {
                const linkUrl = `/${LEAGUE_URL}/${leagueId}/${ENTRY_URL}/${entry.$id}/${WEEK_URL}/${currentWeek}`;

                const selectedTeam = entry.selectedTeams[currentWeek - 1];
                const isPickSet =
                  // eslint-disable-next-line no-undefined
                  selectedTeam !== undefined;

                const teamLogo = NFLTeams.find(
                  (teams) => teams.teamName === selectedTeam,
                )?.teamLogo;

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

            <div className="flex flex-col gap-8 justify-center items-center mt-2 mb-2 w-full">
              {!loadingData && entries.length < MAX_ENTRIES && (
                <Button
                  icon={
                    <PlusCircle
                      className={cn('mr-2', addingEntry && 'hidden')}
                    />
                  }
                  variant="outline"
                  onClick={() =>
                    addNewEntry({
                      name: `Entry ${entries.length + 1}`,
                      user: user.id,
                      league: leagueId,
                    })
                  }
                  data-testid="add-new-entry-button"
                  disabled={addingEntry}
                >
                  {addingEntry ? <LoadingSpinner /> : 'Add New Entry'}
                </Button>
              )}

              {currentWeek > 1 && (
                <Link
                  className="text-primary hover:text-primary-muted font-bold hover:underline"
                  data-testid="past-weeks-link"
                  href={`#`}
                >
                  View Past Weeks
                </Link>
              )}
            </div>
          </section>
        </div>
      )}
    </>
  );
};

export default Entry;
