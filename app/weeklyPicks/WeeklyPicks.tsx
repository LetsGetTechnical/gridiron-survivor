'use client';
import React, { useState, useEffect } from 'react';
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
import { useAuthContext } from '@/context/AuthContextProvider';
import { useRouter } from 'next/navigation';
import { useDataStore } from '@/store/dataStore';
import { IUser, IWeeklyPicks } from '@/api/IapiFunctions';

const teams = ['Vikings', 'Cowboys'] as const;

const FormSchema = z.object({
  type: z.enum(teams, {
    required_error: 'You need to select a team.',
  }),
});

interface Props {
  weeklyPicks: IWeeklyPicks['userResults'] | null;
  NFLTeams: Models.Document[];
}

export default function WeeklyPicks({ weeklyPicks, NFLTeams }: Props) {
  const [allPicks, setAllPicks] = useState<IWeeklyPicks['userResults'] | null>(
    weeklyPicks,
  );
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [userPick, setUserPick] = useState<string | null>(null);
  const { user, updateWeeklyPicks } = useDataStore((state) => state);
  const { isSignedIn } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/login');
    }
    fetchUserPick();
  }, [isSignedIn]);

  useEffect(() => {
    if (!userPick) {
      return;
    }
    console.log('User Pick:', userPick);
    setIsLoaded(true);
  }, [userPick]);

  const fetchUserPick = async () => {
    // search to see if user has selected a weekly
    if (allPicks && allPicks[user.id]) {
      const userSelectedTeam = NFLTeams.find(
        (team) => team.$id === allPicks[user.id].team,
      );
      setUserPick(userSelectedTeam?.teamName);
      console.log('User Pick:', userSelectedTeam?.teamName);
    } else {
      setUserPick('');
    }

    updateWeeklyPicks({
      gameId: '66311a210039f0532044',
      gameWeekId: '6622c7596558b090872b',
      userResults: weeklyPicks,
    });
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
      const updatedWeeklyPicks = { ...allPicks, ...currentUserPick };

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
