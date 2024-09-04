// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { ENTRY_URL, LEAGUE_URL } from '@/const/global';
import { Button } from '@/components/Button/Button';
import { getUserLeagues, fetchAvailableLeagues } from '@/utils/utils';
import { ILeague, IAllLeagues } from '@/api/apiFunctions.interface';
import { addUserToLeague } from '@/api/apiFunctions';
import { LeagueCard } from '@/components/LeagueCard/LeagueCard';
import { useDataStore } from '@/store/dataStore';
import GlobalSpinner from '@/components/GlobalSpinner/GlobalSpinner';
import React, { JSX, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

/**
 * Renders the leagues component.
 * @returns {JSX.Element} The rendered leagues component.
 */
const Leagues = (): JSX.Element => {
  const [availableLeagues, setAvailableLeagues] = useState<IAllLeagues[]>([]);
  const [leagues, setLeagues] = useState<ILeague[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [selectedLeagues, setSelectedLeagues] = useState<string | null>(null);
  const { user } = useDataStore((state) => state);

  /**
   * Fetches all available leagues.
   * @param root0
   * @param root0.participants
   * @param root0.survivors
   * @returns {Promise<void>}
   */
  const fetchLeagues = async (): Promise<void> => {
    try {
      const leagues = await fetchAvailableLeagues();
      console.log(leagues);
      setAvailableLeagues(leagues);
    } catch (error) {
      throw new Error('Error fetching available leagues');
    } finally {
      setLoadingData(false);
    }
  };

  /**
   * Fetches the user's leagues.
   * @returns {Promise<void>}
   */
  const getLeagues = async (): Promise<void> => {
    try {
      const userLeagues = await getUserLeagues(user.leagues);
      setLeagues(userLeagues);
    } catch (error) {
      throw new Error('Error fetching user leagues');
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (!user.id || user.id === '') {
      return;
    }

    fetchLeagues();
    getLeagues();
  }, [user]);

  /**
   * Handles league selection from dropdown.
   * @param {React.ChangeEvent<HTMLSelectElement>} event
   */
  const handleLeagueChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    setSelectedLeagues(event.target.value);
  };

  /**
   * Checks if leagueId already exists, then can't select this league
   * Adds the selected league to the current user's leagues.
   */
  const handleAddLeague = async (): Promise<void> => {
    const { user, updateUser } = useDataStore.getState();
    if (!selectedLeagues) {
      alert('Please select a league to join.');
      return;
    }

    const isLeagueAlreadySelected = user.leagues?.some(
      (leagueId: string) => leagueId === selectedLeagues,
    );

    if (isLeagueAlreadySelected) {
      toast.custom(
        <Alert
          variant={AlertVariants.Warning}
          message="You have already selected this league. Please choose a different one."
        />,
      );
      return;
    }

    const selectedLeague = availableLeagues.find(
      (league) => league.leagueId === selectedLeagues,
    );

    const leagueName = selectedLeague
      ? selectedLeague.leagueName
      : 'Unknown League';

    try {
      await addUserToLeague({
        userId: user.id,
        selectedLeagues: [...(user.leagues ?? []), selectedLeagues],
      });

      updateUser(
        user.id,
        user.email,
        [...(user.leagues ?? []), selectedLeagues],
        [...(user.selectedLeagues ?? []), selectedLeagues],
      );
      toast.custom(
        <Alert
          variant={AlertVariants.Success}
          message={`You have successfully pick the ${leagueName} for your team!`}
        />,
      );
    } catch (error) {
      console.error('Error adding league:', error);
      toast.custom(
        <Alert
          variant={AlertVariants.Error}
          message="Failed to add the league. Please try again."
        />,
      );
    }
  };

  return (
    <div className="Leagues mx-auto max-w-3xl pt-10">
      {loadingData ? (
        <GlobalSpinner />
      ) : (
        <>
          <h1 className="pb-10 text-center text-3xl font-bold tracking-tight">
            Your Leagues
          </h1>

          <section className="grid gap-6 md:grid-cols-2 mb-10">
            {leagues.length > 0 ? (
              leagues.map((league) => (
                <LeagueCard
                  key={league.leagueId}
                  href={`/${LEAGUE_URL}/${league.leagueId}/${ENTRY_URL}/all`}
                  leagueCardLogo="https://ryanfurrer.com/_astro/logo-dark-theme.CS8e9u7V_JfowQ.svg" // should eventually be something like league.logo
                  survivors={league.survivors.length}
                  title={league.leagueName}
                  totalPlayers={league.participants.length}
                />
              ))
            ) : (
              <div className="text-center">
                <p className="text-lg font-bold">
                  You are not enrolled in any leagues
                </p>
              </div>
            )}
          </section>

          <div className="mb-8">
            <label
              htmlFor="available-leagues"
              className="block text-lg font-medium mb-2"
            >
              Select league to join
            </label>
            <select
              id="available-leagues"
              value={selectedLeagues || ''}
              onChange={handleLeagueChange}
              className="border rounded p-2 w-full"
            >
              <option value="">Select league</option>
              {availableLeagues.map((league) => (
                <option value={league.leagueId} key={league.leagueId}>
                  {league.leagueName}
                </option>
              ))}
            </select>
            <Button onClick={handleAddLeague}>Join League</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Leagues;
