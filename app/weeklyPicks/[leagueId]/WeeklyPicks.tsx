'use client';
import { IGameWeek } from '@/api/IapiFunctions';
import { useDataStore } from '@/store/dataStore';
import { getGameData, getUserPick, parseUserPick } from '@/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Models } from 'appwrite/types/models';
import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { createWeeklyPicks } from '../../../api/apiFunctions';
import { Button } from '../../../components/Button/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../../components/Form/Form';
import { RadioGroup } from '../../../components/RadioGroup/RadioGroup';
import { WeeklyPickButton } from '../../../components/WeeklyPickButton/WeeklyPickButton';

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
  leagueId: string;
}

export default function WeeklyPicks({
  NFLTeams,
  currentGameWeek,
  leagueId,
}: Props) {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [userPick, setUserPick] = useState<string | null>(null);
  const {
    user,
    updateWeeklyPicks,
    weeklyPicks,
    updateLeague,
    gameWeek,
    updateGameWeek,
    updateNFLTeam,
    NFLTeam,
  } = useDataStore((state) => state);

  useEffect(() => {
    // Update the current week if it has changed
    if (gameWeek.week !== currentGameWeek.week) {
      updateGameWeek(currentGameWeek);
    }

    // Ensure user and game data are valid before proceeding
    if (user.id === '' || user.email === '' || gameWeek.id === '') return;

    // If userPick exists, set the loaded state and return
    if (userPick) {
      setIsLoaded(true);
      return;
    }

    // Process the game if all conditions are met
    processGame();
  }, [
    user,
    userPick,
    gameWeek,
    currentGameWeek,
    updateGameWeek,
    NFLTeam,
    NFLTeams,
    updateNFLTeam,
  ]);

  const processGame = useCallback(async () => {
    const { league, weeklyPicksData } = await getGameData({
      leagueId: leagueId,
      currentGameWeekId: gameWeek.id,
    });

    if (!league || !weeklyPicksData) {
      console.error('Error getting game data');
      return;
    }

    updateLeague({
      leagueId: leagueId,
      participants: league.participants,
      survivors: league.survivors,
    });

    updateWeeklyPicks({
      leagueId: leagueId,
      gameWeekId: gameWeek.id,
      userResults: weeklyPicksData.userResults,
    });

    const userPickData = await getUserPick({
      weeklyPicks: weeklyPicksData.userResults,
      userId: user.id,
      NFLTeams: NFLTeams,
    });

    setUserPick(userPickData);
  }, [user.id, gameWeek.id, NFLTeams, userPick]);

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
        leagueId: leagueId,
        gameWeekId: gameWeek.id,
        userResults: updatedWeeklyPicks,
      });

      // update weekly picks in the data store
      updateWeeklyPicks({
        leagueId: leagueId,
        gameWeekId: gameWeek.id,
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
