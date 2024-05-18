'use client';
import React, { useState, useEffect } from 'react';
import { Models } from 'appwrite';
import { WeeklyPickButton } from '../../components/WeeklyPickButton/WeeklyPickButton';
import { RadioGroup } from '../../components/RadioGroup/RadioGroup';
import { Button } from '../../components/Button/Button';
import {
  createWeeklyPicks,
  getNFLTeams,
  getAllWeeklyPicks,
} from '../../api/apiFunctions';
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
import { IUser } from '@/api/IapiFunctions';

const teams = ['Vikings', 'Cowboys'] as const;

const FormSchema = z.object({
  type: z.enum(teams, {
    required_error: 'You need to select a team.',
  }),
});

export default function WeeklyPickForm() {
  const [NFLTeams, setNFLTeams] = useState<Models.Document[]>([]);
  const [userPick, setUserPick] = useState<object | null>(null);
  const [allPicks, setAllPicks] = useState<object | null>(null);
  const [userData, setUserData] = useState<IUser | null>(null);
  const { isSignedIn } = useAuthContext();
  const router = useRouter();
  const { user, updateWeeklyPicks, weeklyPicks } = useDataStore(
    (state) => state,
  );

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/login');
      return;
    }
  }, [isSignedIn]);

  // useEffect(() => {
  const fetchWeeklyPicks = async () => {
    try {
      const [allPicksData, nflTeamsData] = await Promise.all([
        getAllWeeklyPicks(),
        getNFLTeams(),
      ]);

      if (!allPicksData) {
        setAllPicks({});
      }

      const currentUserPick = allPicksData[user.id];
      console.log(currentUserPick);
      console.log(nflTeamsData);

      // update weekly picks in the data store
      //userResults in the store captures allPicksData which is an object
      updateWeeklyPicks({
        gameId: '66311a210039f0532044',
        gameWeekId: '6622c7596558b090872b',
        userResults: JSON.stringify(allPicksData),
      });

      // setUserPick(weeklyPicks.userResults[user.id]?.team || '');

      if (!nflTeamsData) {
        console.error('NFL teams data is undefined');
        setNFLTeams([]);
      } else {
        setNFLTeams(nflTeamsData.documents);
      }

      // const currentUserPicks = allPicksData[user.id].team;
      // setUserPick(weeklyPicks.userResults[user.id]?.team || '');

      setAllPicks(allPicksData);
    } catch (error) {
      console.error('Fetching error:', error);
    }
  };

  fetchWeeklyPicks();
  // }, [isSignedIn]);

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
        userResults: JSON.stringify(updatedWeeklyPicks),
      });

      // ! all weekly picks are fetched here - but not by userpreference

      // update weekly picks in the data store
      updateWeeklyPicks({
        gameId: '66311a210039f0532044',
        gameWeekId: '6622c7596558b090872b',
        userResults: JSON.stringify(updatedWeeklyPicks),
      });

      setUserPick(currentUserPick[user.id].team);
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

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
