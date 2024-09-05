// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';

import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { ENTRY_URL, LEAGUE_URL } from '@/const/global';
import { Button } from '@/components/Button/Button';
import { getUserLeagues } from '@/utils/utils';
import { ILeague } from '@/api/apiFunctions.interface';
import { addUserToLeague, getAllLeagues } from '@/api/apiFunctions';
import { LeagueCard } from '@/components/LeagueCard/LeagueCard';
import { useDataStore } from '@/store/dataStore';
import GlobalSpinner from '@/components/GlobalSpinner/GlobalSpinner';
import React, { JSX, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useAuthContext } from '@/context/AuthContextProvider';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const leagueSchema = z.object({
  selectedLeague: z.string().nonempty('Please select a league'),
});

type LeagueFormInputs = z.infer<typeof leagueSchema>;

/**
 * Renders the leagues component.
 * @returns {JSX.Element} The rendered leagues component.
 */
const Leagues = (): JSX.Element => {
  const [leagues, setLeagues] = useState<ILeague[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [selectedLeague, setSelectedLeague] = useState<string | null>(null);
  const { user, updateUser, allLeagues, updateAllLeagues } = useDataStore(
    (state) => state,
  );
  const { isSignedIn } = useAuthContext();
  const { handleSubmit, control } = useForm<LeagueFormInputs>({
    resolver: zodResolver(leagueSchema),
  });

  /**
   * Fetches all leagues and leagues user is a part of from the database.
   */
  const fetchData = async (): Promise<void> => {
    try {
      // Only fetch all leagues if they're not already in the store
      if (allLeagues.length === 0) {
        const fetchedLeagues = await getAllLeagues();
        updateAllLeagues(fetchedLeagues);
      }

      // Fetch user leagues
      const fetchedUserLeagues = await getUserLeagues(user.leagues);
      setLeagues(fetchedUserLeagues);
    } catch (error) {
      console.error('Error fetching leagues:', error);
      toast.custom(
        <Alert
          variant={AlertVariants.Error}
          message="Failed to fetch leagues. Please try again."
        />,
      );
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchData();
    }
  }, [isSignedIn]);

  /**
   * Handles the form submission.
   * @param {LeagueFormInputs} data - The data from the form.
   * @throws {Error} Throws an error if the selected league is not provided.
   */
  const onSubmit: SubmitHandler<LeagueFormInputs> = async (data) => {
    const { selectedLeague } = data;
    const league = allLeagues.find(
      (league) => league.leagueId === selectedLeague,
    );

    if (!league) {
      alert('Please select a valid league.');
      return;
    }

    try {
      await addUserToLeague({
        userDocumentId: user.documentId,
        selectedLeague: league.leagueId,
        selectedLeagues: [...(user.leagues ?? []), league.leagueId],
        participants: [...(league.participants ?? []), user.id],
        survivors: [...(league.survivors ?? []), user.id],
      });

      setLeagues([...leagues, league]);
      updateUser(user.documentId, user.id, user.email, [
        ...user.leagues,
        league.leagueId,
      ]);
      toast.custom(
        <Alert
          variant={AlertVariants.Success}
          message={`Added ${league.leagueName} to your leagues!`}
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
    } finally {
      setSelectedLeague(null);
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

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8">
              <label
                htmlFor="available-leagues"
                className="block text-lg font-medium mb-2"
              >
                Select league to join
              </label>
              <Controller
                name="selectedLeague"
                control={control}
                defaultValue=""
                // rules={{ required: 'Please select a league' }}
                render={({ field, fieldState }) => (
                  <>
                    <select
                      {...field}
                      id="available-leagues"
                      className={`border rounded p-2 w-full dark:text-secondary ${
                        fieldState.error ? 'border-red-500' : ''
                      }`}
                    >
                      <option value="">Select league</option>
                      {allLeagues
                        .filter(
                          (league) => !user.leagues.includes(league.leagueId),
                        )
                        .map((league) => (
                          <option
                            key={`${league.leagueId}-${league.leagueName}`}
                            value={league.leagueId}
                          >
                            {league.leagueName}
                          </option>
                        ))}
                    </select>
                    {fieldState.error && (
                      <span className="text-red-500">
                        {fieldState.error.message}
                      </span>
                    )}
                  </>
                )}
              />
            </div>
            <Button type="submit">Join League</Button>
          </form>
        </>
      )}
    </div>
  );
};

export default Leagues;
