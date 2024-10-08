// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import {
  getCurrentLeague,
  getCurrentUserEntries,
  getGameWeek,
  getNFLTeams,
} from '@/api/apiFunctions';
import { ChevronLeft } from 'lucide-react';
import { ENTRY_URL, LEAGUE_URL, WEEK_URL } from '@/const/global';
import { IEntry } from '../Entries.interface';
import { LeagueEntries } from '@/components/LeagueEntries/LeagueEntries';
import { LeagueSurvivors } from '@/components/LeagueSurvivors/LeagueSurvivors';
import { useDataStore } from '@/store/dataStore';
import GlobalSpinner from '@/components/GlobalSpinner/GlobalSpinner';
import Heading from '@/components/Heading/Heading';
import React, { JSX, useEffect, useState } from 'react';
import LinkCustom from '@/components/LinkCustom/LinkCustom';
import { getNFLTeamLogo } from '@/utils/utils';

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
  const [survivors, setSurvivors] = useState<number>(0);
  const [totalPlayers, setTotalPlayers] = useState<number>(0);
  const { currentWeek, NFLTeams, user, updateCurrentWeek, updateNFLTeams } =
    useDataStore((state) => state);

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
    setLoadingData(true);
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
    setLoadingData(true);
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
    setLoadingData(true);
    try {
      const NFLTeams = await getNFLTeams();
      updateNFLTeams(NFLTeams);
    } catch (error) {
      throw new Error('Error getting NFL teams');
    } finally {
      setLoadingData(false);
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
                  selectedTeam !== null && selectedTeam !== undefined;

                const selectedTeamLogo = getNFLTeamLogo(NFLTeams, selectedTeam);

                let userPickHistory: string[] = [];

                if (currentWeek > 1 && entry.selectedTeams.length > 0) {
                  userPickHistory = entry.selectedTeams
                    .slice(0, currentWeek - 1)
                    .map((teamName) => getNFLTeamLogo(NFLTeams, teamName));
                }

                return (
                  <section key={entry.$id}>
                    <LeagueEntries
                      entryName={entry.name}
                      isEliminated={entry.eliminated}
                      isPickSet={isPickSet}
                      key={entry.$id}
                      linkUrl={linkUrl}
                      userPickHistory={userPickHistory}
                      selectedTeamLogo={selectedTeamLogo}
                    />
                  </section>
                );
              })}
          </section>
        </div>
      )}
    </>
  );
};

export default Entry;
