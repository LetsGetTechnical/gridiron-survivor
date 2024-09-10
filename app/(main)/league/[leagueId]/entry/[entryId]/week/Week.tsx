// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import React, { JSX, useEffect, useState } from 'react';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from '@/components/Form/Form';
import { FormProvider, Control, useForm } from 'react-hook-form';
import { z } from 'zod';
import { IWeekProps } from './Week.interface';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDataStore } from '@/store/dataStore';
import { ISchedule } from './WeekTeams.interface';
import LinkCustom from '@/components/LinkCustom/LinkCustom';
import { ChevronLeft } from 'lucide-react';
import {
  getAllWeeklyPicks,
  getCurrentUserEntries,
  getCurrentLeague,
  getGameWeek,
} from '@/api/apiFunctions';
import { ILeague } from '@/api/apiFunctions.interface';
import WeekTeams from './WeekTeams';
import GlobalSpinner from '@/components/GlobalSpinner/GlobalSpinner';
import { onWeeklyPickChange } from './WeekHelper';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { NFLTeams } from '@/api/apiFunctions.enum';
<<<<<<< clue355/implement-menu-dropdown
=======
import { useAuthContext } from '@/context/AuthContextProvider';
>>>>>>> develop

/**
 * Renders the weekly picks page.
 * @param {IWeekProps} props The parameters for the weekly picks page.
 * @returns {JSX.Element} The rendered weekly picks page.
 */
// eslint-disable-next-line no-unused-vars
const Week = ({ entry, league, NFLTeams, week }: IWeekProps): JSX.Element => {
  const [error, setError] = useState<string | null>(null);
  const [schedule, setSchedule] = useState<ISchedule[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<ILeague | undefined>();
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [userPick, setUserPick] = useState<string>('');
  const { user, updateCurrentWeek, updateWeeklyPicks, weeklyPicks } =
    useDataStore((state) => state);
<<<<<<< clue355/implement-menu-dropdown
=======
  const { isSignedIn } = useAuthContext();
>>>>>>> develop

  /**
   * Fetches the current game week.
   * @returns {Promise<void>}
   */
  const getCurrentGameWeek = async (): Promise<void> => {
    try {
      const getCurrentWeek = await getGameWeek();
      updateCurrentWeek(getCurrentWeek.week);
    } catch (error) {
      console.error('Error getting current week:', error);
      throw new Error('Error getting current week');
    }
  };

  /**
   * Fetches the selected league.
   * @returns {Promise<void>}
   */
  const getSelectedLeague = async (): Promise<void> => {
    const res = await getCurrentLeague(league);
    setSelectedLeague(res);
  };

  const NFLTeamsList = NFLTeams.map((team) => team.teamName) as [
    string,
    ...string[]
  ];

  const FormSchema = z.object({
    type: z.enum(NFLTeamsList, {
      required_error: 'You need to select a team.',
    }),
  });

  /**
   * Fetches the league's weekly pick results for the user and set the user pick.
   * @returns {Promise<void>}
   */
  const getUserWeeklyPick = async (): Promise<void> => {
    try {
      const userWeeklyPickResults = await getAllWeeklyPicks({
        leagueId: league,
        weekId: week,
      });

      updateWeeklyPicks({
        leagueId: league,
        gameWeekId: week,
        userResults: userWeeklyPickResults || {},
      });

      if (userWeeklyPickResults?.[user.id]?.[entry]) {
        const userPick = userWeeklyPickResults[user.id][entry];
        setUserPick(userPick.teamName as unknown as string);
      }
    } catch (error) {
      console.error('Error getting weekly pick:', error);
      throw new Error('Error getting weekly pick');
    }
  };

  /**
   * Loads the week data.
   * @param {string} week The week ID.
   * @returns {Promise<void>} A promise that resolves when the week data is loaded.
   */
  const getSchedule = async (week: string): Promise<void> => {
    if (!week) {
      console.error('Week parameter is undefined or not provided.');
      return;
    }

    try {
      const scheduleData = await import(
        `@/app/(main)/schedule/2024/week${week}.json`
      );
      if (scheduleData.events.length === 0) {
        setError('No events found for the selected week.');
      } else {
        setSchedule(scheduleData.events);
      }
    } catch (error) {
      console.error('Could not load week data:', error);
      setError('Could not load week data.');
    } finally {
      setLoadingData(false);
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  /**
   * Get selected teams for the current user entry.
   * @returns {Promise<void>} The selected teams
   */
  const getUserSelectedTeams = async (): Promise<void> => {
    try {
      const getEntries = await getCurrentUserEntries(user.id, league);
      const currentEntry = getEntries.find(
        (userEntry) => userEntry.$id === entry,
      );
      const selectedTeams = currentEntry?.selectedTeams || [];
      setSelectedTeams(selectedTeams);
    } catch (error) {
      console.error('Error getting user selected teams:', error);
      throw new Error('Error getting user selected teams');
    }
  };

  /**
   * Handles the weekly pick team change
   * @param teamSelect - the selected team name.
   * @returns {void}
   */
  const handleWeeklyPickChange = async (
    teamSelect: NFLTeams,
  ): Promise<void> => {
    const params = {
      teamSelect,
      entry,
      league,
      NFLTeams,
      setUserPick,
      updateWeeklyPicks,
      user,
      weeklyPicks,
      week,
    };

    try {
      await onWeeklyPickChange(params);
      setUserPick(teamSelect);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  useEffect(() => {
    if (!selectedLeague) {
      getSelectedLeague();
      return;
    }
    getSchedule(week);
  }, [week, selectedLeague]);

  useEffect(() => {
<<<<<<< clue355/implement-menu-dropdown
    getCurrentGameWeek();
    getUserSelectedTeams();
    getUserWeeklyPick();
  }, [user]);
=======
    if (isSignedIn) {
      getCurrentGameWeek();
      getUserSelectedTeams();
      getUserWeeklyPick();
    }
  }, [isSignedIn]);
>>>>>>> develop

  if (loadingData) {
    return <GlobalSpinner />;
  }

  if (error) {
    return <Alert variant={AlertVariants.Error} message={error} />;
  }

  return (
    <div className="league-entry-week">
      {loadingData ? (
        <GlobalSpinner data-testid="global-spinner" />
      ) : (
        <>
          <nav className="py-6 text-primary hover:no-underline">
            <LinkCustom
              className="no-underline hover:underline text-primary flex gap-3 items-center font-semibold text-xl"
              href={`/league/${league}/entry/all`}
            >
              <span aria-hidden="true">
                <ChevronLeft size={16} />
              </span>
              {selectedLeague?.leagueName as string}
            </LinkCustom>
          </nav>
          <section className="w-full pt-8" data-testid="weekly-picks">
            <h1 className="pb-8 text-center text-[2rem] font-bold text-foreground">
              Week {week} pick
            </h1>

            <FormProvider {...form}>
              <form className="mx-auto flex w-[90%] max-w-3xl flex-col items-center">
                <FormField
                  control={form.control as Control<object>}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <WeekTeams
                          schedule={schedule}
                          selectedTeams={selectedTeams}
                          field={field}
                          userPick={userPick}
                          onWeeklyPickChange={handleWeeklyPickChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </FormProvider>
          </section>
        </>
      )}
    </div>
  );
};
export default Week;
