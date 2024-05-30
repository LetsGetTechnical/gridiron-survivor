'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
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
import { IGameWeek } from '@/api/IapiFunctions';
import { Models } from 'appwrite/types/models';
import { getGameData, getUserPick, parseUserPick } from '@/utils/utils';

const teams = ['Vikings', 'Cowboys'] as const;

const FormSchema = z.object({
  type: z.enum(teams, {
    required_error: 'You need to select a team.',
  }),
});

export const revalidate = 900; // 15 minutes

interface Props {
  NFLTeams: Models.Document[];
  currentGameWeek: IGameWeek;
}

export default function WeeklyPicks({ NFLTeams, currentGameWeek }: Props) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [userPick, setUserPick] = useState<string | null>(null);
  const { user, updateWeeklyPicks, weeklyPicks, updateGameGroup, gameGroup } =
    useDataStore((state) => state);

  useEffect(() => {
    if (user.id === '' || user.email === '') return;

    if (userPick) {
      setIsLoaded(true);
      return;
    }

    processGame();
  }, [user, userPick]);

  const processGame = useCallback(async () => {
    const { gameGroupData, weeklyPicksData } = await getGameData(
      user.id,
      currentGameWeek.id,
    );

    if (!gameGroupData || !weeklyPicksData) {
      console.error('Error getting game data');
      return;
    }

    updateGameGroup({
      currentGameId: gameGroupData.currentGameId,
      participants: gameGroupData.participants,
      survivors: gameGroupData.survivors,
    });

    updateWeeklyPicks({
      gameId: weeklyPicksData.gameId,
      gameWeekId: currentGameWeek.id,
      userResults: weeklyPicksData.userResults,
    });

    const userPickData = await getUserPick(
      weeklyPicksData.userResults,
      user.id,
      NFLTeams,
    );

    setUserPick(userPickData);
  }, [user.id, currentGameWeek.id, NFLTeams, userPick]);

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

      // combines current picks and the user pick into one object.
      // if the user pick exists then it overrides the pick of the user.
      const updatedWeeklyPicks = {
        ...weeklyPicks.userResults,
        ...currentUserPick,
      };

      // update weekly picks in the database
      await createWeeklyPicks({
        gameId: gameGroup.currentGameId,
        gameWeekId: currentGameWeek.id,
        userResults: updatedWeeklyPicks,
      });

      // update weekly picks in the data store
      updateWeeklyPicks({
        gameId: gameGroup.currentGameId,
        gameWeekId: currentGameWeek.id,
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
    <section className="w-full pt-8" data-testid="weekly-picks">
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
