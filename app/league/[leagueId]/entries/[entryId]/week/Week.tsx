// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import React, { JSX, useEffect, useState } from 'react';
import { Button } from '@/components/Button/Button';
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
import WeekTeams from './WeekTeams';
import { ISchedule } from './WeekTeams.interface';
import LinkCustom from '@/components/LinkCustom/LinkCustom';
import { ChevronLeft } from 'lucide-react';
import { ILeague } from '@/api/apiFunctions.interface';
/**
 * Renders the weekly picks page.
 * @param {IWeekProps} props The parameters for the weekly picks page.
 * @returns {JSX.Element} The rendered weekly picks page.
 */
// eslint-disable-next-line no-unused-vars
const Week = ({ league, NFLTeams, week }: IWeekProps): JSX.Element => {
  const [schedule, setSchedule] = useState<ISchedule[]>([]);
  const [userPick, setUserPick] = useState<string>('');

  const { leagues, user, updateWeeklyPicks, weeklyPicks } = useDataStore(
    (state) => state,
  );

  // const selectedLeague = leagues.find((league) => league.leagueId == league);
  // console.log(selectedLeague);

  // console.log(leagues);

  const selectedLeague = leagues.find(
    (league: ILeague) => league.leagueId === league,
  );
  console.log(selectedLeague);

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
  const onSubmit = async (data: z.infer<typeof FormSchema>): Promise<void> => {
    try {
      const teamSelect = data.type.toLowerCase();
      const teamID = NFLTeams.find(
        (team) => team.teamName.toLowerCase() === teamSelect,
      )?.teamId;

      const currentUserPick = parseUserPick(user.id, teamID || '');

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

      setUserPick(currentUserPick[user.id].team);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  useEffect(() => {
    getSchedule(week);
  }, [week]);

  if (schedule.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <nav className="py-6 text-orange-500 flex gap-3 items-center font-semibold text-xl hover:no-underline group ">
        <ChevronLeft className="group-hover:text-orange-600" size={16} />
        <LinkCustom
          className="text-orange-500 flex gap-3 items-center font-semibold text-xl hover:no-underline"
          href="/league/all"
        >
          asdf
        </LinkCustom>
      </nav>
      <section className="w-full pt-8" data-testid="weekly-picks">
        <h1 className="pb-8 text-center text-[2rem] font-bold text-white">
          Week {week} pick
        </h1>

        <FormProvider {...form}>
          <form
            className="mx-auto flex w-[90%] max-w-3xl flex-col items-center gap-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button label="Submit Button" type="submit" />
          </form>
        </FormProvider>
      </section>
    </div>
  );
};

export default Week;
