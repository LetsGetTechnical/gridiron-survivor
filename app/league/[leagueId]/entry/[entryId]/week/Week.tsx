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
import { createWeeklyPicks } from '@/api/apiFunctions';
import { parseUserPick } from '@/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDataStore } from '@/store/dataStore';
import { ISchedule } from './WeekTeams.interface';
import LinkCustom from '@/components/LinkCustom/LinkCustom';
import { ChevronLeft } from 'lucide-react';
import { getCurrentLeague } from '@/api/apiFunctions';
import { ILeague } from '@/api/apiFunctions.interface';
import WeekTeams from './WeekTeams';

/**
 * Renders the weekly picks page.
 * @param {IWeekProps} props The parameters for the weekly picks page.
 * @returns {JSX.Element} The rendered weekly picks page.
 */
// eslint-disable-next-line no-unused-vars
const Week = ({ entry, league, NFLTeams, week }: IWeekProps): JSX.Element => {
  const [schedule, setSchedule] = useState<ISchedule[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<ILeague | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userPick, setUserPick] = useState<string>('');
  const { user, updateWeeklyPicks, weeklyPicks } = useDataStore(
    (state) => state,
  );

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
      const scheduleData = await import(`@/app/schedule/2024/week${week}.json`);
      setSchedule(scheduleData.events);
    } catch (error) {
      console.error('Could not load week data:', error);
    }
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  /**
   * Handles the form submission.
   * @param data - The form data.
   * @returns {void}
   */
  const onWeeklyPickChange = async (
    data: React.ChangeEvent<HTMLSelectElement>,
  ): Promise<void> => {
    try {
      const teamSelect = data.target.value;
      const teamID = NFLTeams.find(
        (team) => team.teamName === teamSelect,
      )?.teamName;

      const currentUserPick = parseUserPick(user.id, entry, teamID || '');

      // combines current picks and the user pick into one object.
      // if the user pick exists then it overrides the pick of the user.
      const updatedWeeklyPicks = {
        ...weeklyPicks.userResults,
        ...currentUserPick,
      };

      // update weekly picks in the database
      await createWeeklyPicks({
        leagueId: league,
        gameWeekId: week,
        userResults: updatedWeeklyPicks,
      });

      // update weekly picks in the data store
      updateWeeklyPicks({
        leagueId: league,
        gameWeekId: week,
        userResults: updatedWeeklyPicks,
      });

      setUserPick(currentUserPick[user.id][entry].teamName);
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
    setIsLoading(false);
  }, [week]);

  if (schedule.length === 0 || isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="league-entry-week">
      <nav className="py-6 text-orange-500 hover:no-underline">
        <LinkCustom
          className="text-orange-500 flex gap-3 items-center font-semibold text-xl hover:no-underline"
          href="/league/all"
        >
          <span aria-hidden="true">
            <ChevronLeft size={16} />
          </span>
          {selectedLeague?.leagueName as string}
        </LinkCustom>
      </nav>
      <section className="w-full pt-8" data-testid="weekly-picks">
        <h1 className="pb-8 text-center text-[2rem] font-bold text-white">
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
                      field={field}
                      userPick={userPick}
                      onWeeklyPickChange={onWeeklyPickChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </FormProvider>
      </section>
    </div>
  );
};

export default Week;
