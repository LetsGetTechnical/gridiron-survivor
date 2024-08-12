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
import { getAllWeeklyPicks, getCurrentUserEntries } from '@/api/apiFunctions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDataStore } from '@/store/dataStore';
import { ISchedule } from './WeekTeams.interface';
import LinkCustom from '@/components/LinkCustom/LinkCustom';
import { ChevronLeft } from 'lucide-react';
import { getCurrentLeague } from '@/api/apiFunctions';
import { ILeague, INFLTeam } from '@/api/apiFunctions.interface';
import WeekTeams from './WeekTeams';
import { onWeeklyPickChange } from './WeekHelper';

/**
 * Renders the weekly picks page.
 * @param {IWeekProps} props The parameters for the weekly picks page.
 * @returns {JSX.Element} The rendered weekly picks page.
 */
// eslint-disable-next-line no-unused-vars
const Week = ({ entry, league, NFLTeams, week }: IWeekProps): JSX.Element => {
  const [schedule, setSchedule] = useState<ISchedule[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<ILeague | undefined>();
  const [selectedTeams, setSelectedTeams] = useState<INFLTeam[]>([]);
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
   * Fetches the league's weekly pick results for the user.
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
    } catch (error) {
      console.error('Error getting weekly pick:', error);
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
      setSchedule(scheduleData.events);
    } catch (error) {
      console.error('Could not load week data:', error);
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
    }
  };

  /**
   * Handles the weekly pick team change
   * @param teamSelect - the selected team name.
   * @returns {void}
   */
  const handleWeeklyPickChange = async (teamSelect: string): Promise<void> => {
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
    getUserWeeklyPick();
    setIsLoading(false);
  }, [week, selectedLeague]);

  useEffect(() => {
    if (weeklyPicks?.userResults[user.id]?.[entry]) {
      const userPick = weeklyPicks.userResults[user.id][entry].teamName;
      setUserPick(userPick);
    }
    getUserSelectedTeams();
  }, [weeklyPicks, user, entry]);

  if (schedule.length === 0 || isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="league-entry-week">
      <nav className="py-6 text-orange-500 hover:no-underline">
        <LinkCustom
          className="text-orange-500 flex gap-3 items-center font-semibold text-xl hover:no-underline"
          href={`/league/${league}/entry/all`}
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
    </div>
  );
};

export default Week;
