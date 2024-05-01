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
} from '@/api/apiFunctions';
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

/////// Edit to include the list of teams or from the API: ///////
const teams = ['Vikings', 'Cowboys'] as const;
//////////////////////////////////////////////////////////////////

const FormSchema = z.object({
  type: z.enum(teams, {
    required_error: 'You need to select a team.',
  }),
});

export default function WeeklyPickForm() {
  const [NFLTeams, setNFLTeams] = useState<Models.Document[]>([]);
  const [weeklyPicks, setWeeklyPicks] = useState<Models.Document>();

  useEffect(() => {
    async function fetchNFLTeams() {
      const data = await getNFLTeams();
      if (data) {
        const response = data.documents;
        setNFLTeams(response);
      }
    }

    fetchNFLTeams();
  }, []);

  useEffect(() => {
    async function fetchWeeklyPicks() {
      const user = await account.get();

      const userPicks = await getUserWeeklyPick({
        userId: user.$id,
        weekNumber: '6622c75658b8df4c4612',
      });

      const nflTeams = await getNFLTeams();

      if (nflTeams && userPicks) {
        const userResponse = userPicks;
        const nflResponse = nflTeams.documents;

        const findTeam = nflResponse.find(
          (team) => team.$id === userResponse[user.$id].team,
        );

        setWeeklyPicks(findTeam);
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

      localStorage.setItem('team', data.type);
      let correct = false;

      if (teamSelect === 'vikings') {
        correct = true;
      } else if (teamSelect === 'cowboys') {
        correct = false;
      }

      const user = await account.get();
      const response = await getUserWeeklyPick({
        userId: user.$id,
        weekNumber: '6622c75658b8df4c4612',
      });

      const findTeamID = NFLTeams.find(
        (ele) => ele.teamName.toLowerCase() === teamSelect,
      );

      response[user.$id] = { team: findTeamID?.$id, correct: correct };

      createWeeklyPicks({
        gameId: '66311a210039f0532044',
        gameWeekId: '6622c7596558b090872b',
        userResults: JSON.stringify(response),
      });
    } catch (err) {
      console.error(err);
    }
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
                    defaultValue={
                      weeklyPicks
                        ? weeklyPicks.teamName
                        : localStorage.getItem('team')
                    }
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
