'use client';
import { useState, useEffect } from 'react';
import { WeeklyPickButton } from '../../components/WeeklyPickButton/WeeklyPickButton';
import { RadioGroup } from '../../components/RadioGroup/RadioGroup';
import { Button } from '../../components/Button/Button';
import {
  createWeeklyPicks,
  getAllWeeklyPicks,
  getCurrentGame,
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
import { useDataStore } from '@/store/dataStore';
import { IGameWeek, IUser, INFLTeam } from '@/api/IapiFunctions';
import { Models } from 'appwrite/types/models';

const teams = ['Vikings', 'Cowboys'] as const;

const FormSchema = z.object({
  type: z.enum(teams, {
    required_error: 'You need to select a team.',
  }),
});

interface Props {
  NFLTeams: Models.Document[];
  currentGameWeek: IGameWeek;
}

export default function WeeklyPicks({ NFLTeams, currentGameWeek }: Props) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [userPick, setUserPick] = useState<string | null>(null);
  const { user, updateWeeklyPicks, weeklyPicks, updateGameGroup } =
    useDataStore((state) => state);

  useEffect(() => {
    if (user.id === '' || user.email === '') return;
    getGameData();
  }, [user]);

  useEffect(() => {
    if (weeklyPicks.gameId === '' || weeklyPicks.gameWeekId === '') return;
    getUserPick();
  }, [weeklyPicks]);

  useEffect(() => {
    if (userPick === null) return;
    setIsLoaded(true);
  }, [userPick]);

  const getGameData = async () => {
    // find the game group the user is in
    const game = await getCurrentGame(user.id);

    if (!game) return;

    // update the game group in the data store
    updateGameGroup({
      currentGameId: game.$id,
      participants: game.participants,
      survivors: game.survivors,
    });

    // find all weekly picks for current game week
    const weeklyPicksData = await getAllWeeklyPicks({
      gameId: game.$id,
      weekId: currentGameWeek.id,
    });

    // update weekly picks in the data store
    updateWeeklyPicks({
      gameId: game.$id,
      gameWeekId: currentGameWeek.id,
      userResults: weeklyPicksData,
    });
  };

  const getUserPick = async () => {
    const userTeamId = weeklyPicks.userResults?.[user.id]?.team;
    if (userTeamId) {
      const userSelectedTeam = NFLTeams.find((team) => team.$id === userTeamId);
      setUserPick(userSelectedTeam?.teamName || '');
    } else {
      console.log('No User Pick Found');
      setUserPick('');
    }
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
