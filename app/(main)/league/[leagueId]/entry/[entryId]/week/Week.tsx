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
import { useAuthContext } from '@/context/AuthContextProvider';
import { cn, getNFLTeamLogo } from '@/utils/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import LinkCustom from '@/components/LinkCustom/LinkCustom';
import { ChevronLeft } from 'lucide-react';
import Heading from '@/components/Heading/Heading';

/**
 * Renders the weekly picks page.
 * @param {IWeekProps} props The parameters for the weekly picks page.
 * @returns {JSX.Element} The rendered weekly picks page.
 */
// eslint-disable-next-line no-unused-vars
const Week = ({ entry, league, NFLTeams, week }: IWeekProps): JSX.Element => {
  const [pickHistory, setPickHistory] = useState<string[]>([]);
  const [entryName, setEntryName] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [schedule, setSchedule] = useState<ISchedule[]>([]);
  const [selectedLeague, setSelectedLeague] = useState<ILeague | undefined>();
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [loadingTeamName, setLoadingTeamName] = useState<string | null>(null);
  const [userPick, setUserPick] = useState<string>('');
  const { user, updateCurrentWeek, updateWeeklyPicks, weeklyPicks } =
    useDataStore((state) => state);
  const { isSignedIn } = useAuthContext();
  const router = useRouter();

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
      setError('Could not load week data.');
      throw error;
    }
  };

  /**
   * Fetches all entries for the current user.
   * @returns {Promise<void>}
   */
  const getPickHistory = async (): Promise<void> => {
    const entryId: string = entry;

    try {
      const entries = await getCurrentUserEntries(user.id, league);
      const currentEntry = entries.find((entry) => entry.$id === entryId);

      if (!currentEntry) {
        throw new Error('Entry not found');
      }
      
      setEntryName(currentEntry.name);
      let entryHistory = currentEntry?.selectedTeams || [];

      if (currentEntry?.selectedTeams.length > 0) {
        entryHistory = entryHistory.map((teamName) =>
          getNFLTeamLogo(NFLTeams, teamName),
        );
      }

      setPickHistory(entryHistory);
    } catch (error) {
      throw new Error("Error fetching user's pick history");
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
      setLoadingTeamName,
      setUserPick,
      updateWeeklyPicks,
      user,
      weeklyPicks,
      week,
    };

    try {
      await onWeeklyPickChange(params);
      setUserPick(teamSelect);
      router.push(`/league/${league}/entry/all`);
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
    if (isSignedIn) {
      getCurrentGameWeek();
      getUserSelectedTeams();
      getUserWeeklyPick();
      getPickHistory();
    }
  }, [isSignedIn]);

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
          <section
            className="flex flex-col items-center w-full pt-8"
            data-testid="weekly-picks"
          >
            <Heading 
              as='h1'
              className='pb-8'
            >{`Week ${week} pick`}
            </Heading>
            <Heading
              as='h2'
              className='pb-8 text-muted-foreground'
              data-testid='entry-name'
            >{`Entry ${entryName}`}
            </Heading>
            {pickHistory.length > 0 && (
              <section
                className="flex flex-wrap w-[90%] gap-4 overflow-x-scroll justify-center pb-10 items-center"
                data-testid="user-pick-history"
              >
                {pickHistory?.map((logoURL, index) => {
                  const isCurrentWeek = index === pickHistory.length - 1;
                  const hasCurrentWeekPick =
                    pickHistory.length === Number(week);

                  return (
                    <div
                      key={`${logoURL ? logoURL : 'no-pick'}-${index + 1}`}
                      className={cn(
                        'flex flex-col items-center justify-center border p-2 rounded-lg gap-1',
                        isCurrentWeek && hasCurrentWeekPick
                          ? 'border-primary'
                          : 'border-border opacity-80',
                      )}
                    >
                      <span className="text-sm">
                        {isCurrentWeek && hasCurrentWeekPick
                          ? 'CURRENT'
                          : `WEEK ${index + 1}`}
                      </span>
                      {logoURL ? (
                        <Image
                          className="league-entry-logo"
                          width={64}
                          height={64}
                          data-testid="league-history-logo"
                          src={logoURL}
                          alt="teamLogo"
                        />
                      ) : (
                        <span
                          className="text-xs h-16 w-16 text-primary pt-6 text-center"
                          data-testid="no-pick"
                        >
                          No Pick
                        </span>
                      )}
                    </div>
                  );
                })}
              </section>
            )}

            <FormProvider {...form}>
              <form className="mx-auto flex w-[90%] max-w-3xl flex-col items-center">
                <FormField
                  control={form.control as Control<object>}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <WeekTeams
                          loadingTeamName={loadingTeamName}
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
