// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import React, { JSX, useEffect, useState } from 'react';
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  Form,
} from '@/components/Form/Form';
import { FormProvider, Control, useForm, SubmitHandler } from 'react-hook-form';
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
  updateEntryName,
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
import { Check, ChevronLeft, Pen, X } from 'lucide-react';
import Heading from '@/components/Heading/Heading';
import { Button } from '@/components/Button/Button';
import { Input } from '@/components/Input/Input';

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
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const { user, updateCurrentWeek, updateWeeklyPicks, weeklyPicks } =
    useDataStore((state) => state);
  const { isSignedIn } = useAuthContext();
  const router = useRouter();

  const NFLTeamsList = NFLTeams.map((team) => team.teamName) as [
    string,
    ...string[]
  ];
  const WeekTeamsFormSchema = z.object({
    type: z.enum(NFLTeamsList, {
      required_error: 'You need to select a team.',
    }),
  });
  const weekTeamsForm = useForm<z.infer<typeof WeekTeamsFormSchema>>({
    resolver: zodResolver(WeekTeamsFormSchema),
  });

  const EntryNameFormSchema = z.object({
    name: z
      .string()
      .min(3, 'Entry name must contain at least 3 characters')
      .max(50, 'Entry name must contain no more than 50 characters'),
  });
  const entryNameForm = useForm<z.infer<typeof EntryNameFormSchema>>({
    resolver: zodResolver(EntryNameFormSchema),
    defaultValues: {
      name: entryName,
    },
  });

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
      entryNameForm.reset({ name: currentEntry.name });

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

  /**
   * handles the form submission
   * @param data - the form data
   * @returns {void}
   */
  const onSubmit: SubmitHandler<z.infer<typeof EntryNameFormSchema>> = async (
    data,
  ): Promise<void> => {
    const { name } = data;
    const entryId: string = entry;
    try {
      await updateEntryName({ entryId, entryName: name });
      setEntryName(name);
      entryNameForm.reset({ name: name });
      setIsEditing(false);
    } catch (error) {
      throw error;
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
            <Heading as="h1" className="pb-8" data-testid="week__week-number">
              {`Week ${week} pick`}
            </Heading>
            <div className="flex justify-center items-center gap-2 pb-8">
              {isEditing ? (
                <>
                  <Form {...entryNameForm}>
                    <form
                      id="input-container"
                      className="grid gap-3"
                      onSubmit={entryNameForm.handleSubmit(onSubmit)}
                    >
                      <FormField
                        control={entryNameForm.control as Control<object>}
                        name="name"
                        render={({ field }) => (
                          <FormItem className="space-y-0">
                            <div className="flex gap-2">
                              <div className="flex-1">
                                <FormControl>
                                  <Input
                                    data-testid="entry-name"
                                    type="text"
                                    className="text-muted-foreground"
                                    maxLength={50}
                                    {...field}
                                  />
                                </FormControl>
                                {entryNameForm.formState.errors.name && (
                                  <FormMessage className="mt-1" />
                                )}
                              </div>
                              <Button
                                type="button"
                                variant="secondary"
                                size="icon"
                                aria-label="Cancel Editing"
                                onClick={() => setIsEditing(false)}
                              >
                                <X className="text-accent" />
                              </Button>
                              <Button
                                type="submit"
                                variant="secondary"
                                size="icon"
                                aria-label="Accept Edit"
                              >
                                <Check className="text-accent" />
                              </Button>
                            </div>
                          </FormItem>
                        )}
                      />
                    </form>
                  </Form>
                </>
              ) : (
                <>
                  <Heading
                    as="h2"
                    className="text-muted-foreground break-normal leading-7"
                    data-testid="week__entry-name"
                  >
                    {entryName}
                  </Heading>
                  <Button
                    variant="secondary"
                    size="icon"
                    aria-label="Edit Entry name"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Pen className="text-accent" />
                  </Button>
                </>
              )}
            </div>
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

            <FormProvider {...weekTeamsForm}>
              <form className="mx-auto flex w-[90%] max-w-3xl flex-col items-center">
                <FormField
                  control={weekTeamsForm.control as Control<object>}
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
