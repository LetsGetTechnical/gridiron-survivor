'use client';
import { useState, useEffect } from 'react';
import { Models } from 'appwrite';
import { WeeklyPickButton } from '../../components/WeeklyPickButton/WeeklyPickButton';
import { RadioGroup } from '../../components/RadioGroup/RadioGroup';
import { Button } from '../../components/Button/Button';
import { createWeeklyPicks } from '../../api/apiFunctions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../components/Form/Form';
import { useDataStore } from '@/store/dataStore';
import { IUser, IWeeklyPicks } from '@/api/IapiFunctions';

const teams = ['Vikings', 'Cowboys'] as const;

const FormSchema = z.object({
  type: z.enum(teams, {
    required_error: 'You need to select a team.',
  }),
});

interface Props {
  weeklyPicksData: IWeeklyPicks['userResults'] | null;
  NFLTeams: Models.Document[];
}

export default function WeeklyPicks({ weeklyPicksData, NFLTeams }: Props) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [userPick, setUserPick] = useState<string | null>(null);
  const { user, updateWeeklyPicks, weeklyPicks } = useDataStore(
    (state) => state,
  );

  //** Grabbing the weekly picks data if a user is logged in */
  useEffect(() => {
    if (user.id === '' || user.email === '') return;
    setWeeklyPicks();
  }, [user]);

  //** Grabbing the user's weekly picks if there any weeklyPicks data */
  useEffect(() => {
    if (weeklyPicks.gameId === '' || weeklyPicks.gameWeekId === '') return;
    fetchUserPick();
  }, [weeklyPicks]);

  //** Grabbing the dynamic gameWeekId */
  useEffect(() => {
    if (weeklyPicks.gameId === '' || weeklyPicks.gameWeekId === '') return;
    fetchCurrentWeek();
  }, [weeklyPicks]);

  //** If user's pick is not empty, show what the user picked  */
  useEffect(() => {
    if (userPick === null) return;
    setIsLoaded(true);
  }, [userPick]);

  const setWeeklyPicks = () => {
    updateWeeklyPicks({
      // gameId: weeklyPicks.gameId,
      // gameWeekId: weeklyPicks.gameWeekId,
      gameId: '66311a210039f0532044',
      gameWeekId: '6622c7596558b090872b',
      userResults: weeklyPicksData,
    });
  };

  const fetchUserPick = async () => {
    console.log(weeklyPicks);
    console.log(user);
    const userTeamId = weeklyPicks.userResults?.[user.id]?.team;
    if (userTeamId) {
      const userSelectedTeam = NFLTeams.find((team) => team.$id === userTeamId);
      setUserPick(userSelectedTeam?.teamName);
      console.log('User Pick:', userSelectedTeam?.teamName);
    } else {
      console.log('No User Pick Found');
      setUserPick('');
    }
  };

  const fetchCurrentWeek = async () => {
    console.log('this ran');
  };

  const parseUserPick = (userId: IUser['id'], teamId: string) => {
    if (!userId || !teamId || teamId === '') {
      throw new Error('User ID and Team ID Required');
    }

    const parsedData = JSON.parse(
      `{"${userId}":{"team":"${teamId}","correct":true}}`,
    );

    return parsedData;
  };

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      const teamSelect = data.type.toLowerCase();

      const teamID = NFLTeams.find(
        (team) => team.teamName.toLowerCase() === teamSelect,
      )?.$id;

      const currentUserPick = parseUserPick(user.id, teamID || '');

      // combine current picks and the user pick into one object
      const updatedWeeklyPicks = {
        ...weeklyPicks.userResults,
        ...currentUserPick,
      };

      // update weekly picks in the database
      await createWeeklyPicks({
        gameId: '66311a210039f0532044',
        gameWeekId: '6622c7596558b090872b',
        userResults: updatedWeeklyPicks,
      });

      // update weekly picks in the data store
      updateWeeklyPicks({
        gameId: '66311a210039f0532044',
        gameWeekId: '6622c7596558b090872b',
        userResults: updatedWeeklyPicks,
      });

      setUserPick(currentUserPick[user.id].team);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  if (!isLoaded) {
    return;
  }

  return (
    <section className="w-full pt-8">
      <h1 className="pb-8 text-center text-[2rem] font-bold text-white">
        Your pick sheet
      </h1>

      <Form {...form}>
        <form
          className="mx-auto flex w-[90%] max-w-3xl flex-col items-center gap-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={userPick || ''}
                  >
                    <FormItem>
                      <FormControl>
                        <WeeklyPickButton
                          team={NFLTeams[0]?.teamName}
                          src={NFLTeams[0]?.teamLogo}
                        />
                      </FormControl>
                    </FormItem>

                    <FormItem>
                      <FormControl>
                        <WeeklyPickButton
                          team={NFLTeams[1]?.teamName}
                          src={NFLTeams[1]?.teamLogo}
                        />
                      </FormControl>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button label="Submit Button" type="submit" />
        </form>
      </Form>
    </section>
  );
}
