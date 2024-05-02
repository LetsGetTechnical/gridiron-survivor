'use client';
import React, { useState, useEffect } from 'react';
import { Models } from 'appwrite';
import { WeeklyPickButton } from '../../components/WeeklyPickButton/WeeklyPickButton';
import { RadioGroup } from '../../components/RadioGroup/RadioGroup';
import { Button } from '../../components/Button/Button';
import {
  getUserWeeklyPick,
  createWeeklyPicks,
  getNFLTeams,
  getAllWeeklyPicks,
} from '../../api/apiFunctions';
import { account } from '../../api/config';
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

const teams = ['Vikings', 'Cowboys'] as const;

const FormSchema = z.object({
  type: z.enum(teams, {
    required_error: 'You need to select a team.',
  }),
});

export default function WeeklyPickForm() {
  const [NFLTeams, setNFLTeams] = useState<Models.Document[]>([]);
  const [userPick, setUserPick] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [allPicks, setAllPicks] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeeklyPicks() {
      try {
        const allPicks = await getAllWeeklyPicks();

        const data = await getNFLTeams();

        const response = data.documents;
        setNFLTeams(response);

        const user = await account.get();

        setUserId(user.$id);

        const userPickedTeam = await getUserWeeklyPick({
          userId: user.$id,
          weekNumber: '6622c75658b8df4c4612',
        });
        //6632c52ead510c046b56
        // console.log(user.$id);

        if (userPickedTeam) {
          setUserPick(userPickedTeam);
        }

        if (allPicks?.documents[0].userResults != '')
          setAllPicks(allPicks?.documents[0].userResults);
      } catch (error) {
        console.error(error);
      }
    }

    fetchWeeklyPicks();
  }, []);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const teamSelect = data.type.toLowerCase();

      if (typeof window !== 'undefined') {
        window.localStorage.setItem('team', data.type);
      }

      const findTeamID = NFLTeams.find(
        (ele) => ele.teamName.toLowerCase() === teamSelect,
      );

      let appendNewResult;
      if (userPick?.search(userId) && userPick?.search(userId) != -1) {
        console.error('You already picked a team');
      } else {
        const newObj = `"${userId}":{"team":"${findTeamID?.$id}","correct":true}`;
        if (allPicks === null) {
          appendNewResult = `{${newObj}}`;
        } else {
          appendNewResult = `{${allPicks},${newObj}}`;
        }
      }

      createWeeklyPicks({
        gameId: '66311a210039f0532044',
        gameWeekId: '6622c7596558b090872b',
        userResults: appendNewResult,
      });
    } catch (error) {
      console.error(error);
    }
  }

  const grabCache = () => {
    if (typeof window !== 'undefined') {
      return window.localStorage.getItem('team');
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
                    defaultValue={grabCache() || ''}
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
