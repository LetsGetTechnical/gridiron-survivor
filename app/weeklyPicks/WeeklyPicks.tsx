// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

'use client';
import React, { JSX, useCallback, useEffect, useState } from 'react';
import { IGameWeek } from '@/api/apiFunctions.interface';
import { useDataStore } from '@/store/dataStore';
import { getGameData, getUserPick, parseUserPick } from '@/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Models } from 'appwrite/types/models';
import { Control, useForm } from 'react-hook-form';
import { z } from 'zod';
import { createWeeklyPicks } from '../../api/apiFunctions';
import { Button } from '../../components/Button/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../../components/Form/Form';
import { RadioGroup } from '../../components/RadioGroup/RadioGroup';
import { WeeklyPickButton } from '../../components/WeeklyPickButton/WeeklyPickButton';
import { toast } from 'react-hot-toast';
import Alert from '@/components/AlertNotification/AlertNotification';
import { Variant } from '../../components/AlertNotification/Alerts.enum';

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

/**
 * Renders the weekly picks page.
 * @param props - The page props.
 * @param props.NFLTeams - The NFL teams.
 * @param props.currentGameWeek - The current game week.
 * @returns {JSX.Element} The rendered weekly picks page.
 */
const WeeklyPicks = ({ NFLTeams, currentGameWeek }: Props): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [userPick, setUserPick] = useState<string | null>(null);
  const {
    user,
    updateWeeklyPicks,
    weeklyPicks,
    updateGameGroup,
    gameGroup,
    gameCurrentWeek,
    updateCurrentWeek,
    updateNFLTeam,
    NFLTeam,
  } = useDataStore((state) => state);

  useEffect(() => {
    // Update the current week if it has changed
    if (gameCurrentWeek.week !== currentGameWeek.week) {
      updateCurrentWeek(currentGameWeek);
    }

    // Ensure user and game data are valid before proceeding
    if (user.id === '' || user.email === '' || gameCurrentWeek.id === '') {
      return;
    }

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
    gameCurrentWeek,
    currentGameWeek,
    updateCurrentWeek,
    NFLTeam,
    NFLTeams,
    updateNFLTeam,
  ]);

  const processGame = useCallback(async () => {
    const { gameGroupData, weeklyPicksData } = await getGameData({
      userId: user.id,
      currentGameWeekId: gameCurrentWeek.id,
    });

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
      gameWeekId: gameCurrentWeek.id,
      userResults: weeklyPicksData.userResults,
    });

    const userPickData = await getUserPick({
      weeklyPicks: weeklyPicksData.userResults,
      userId: user.id,
      NFLTeams: NFLTeams,
    });

    setUserPick(userPickData);
  }, [user.id, gameCurrentWeek.id, NFLTeams, userPick]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  /**
   * Handles the form submission.
   * @param data - The form data.
   * @returns {void}
   */
  const onSubmit = async (data: z.infer<typeof FormSchema>): Promise<void> => {
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
        gameWeekId: gameCurrentWeek.id,
        userResults: updatedWeeklyPicks,
      });

      // update weekly picks in the data store
      updateWeeklyPicks({
        gameId: gameGroup.currentGameId,
        gameWeekId: gameCurrentWeek.id,
        userResults: updatedWeeklyPicks,
      });

      setUserPick(currentUserPick[user.id].team);

      toast.custom(
        <Alert variant={Variant.Success} message="Your pick was successful." />,
      );
    } catch (error) {
      console.error('Submission error:', error);
      toast.custom(
        <Alert
          variant={Variant.Error}
          message="There was an error processing your request."
        />,
      );
    }
  };

  if (!isLoaded) {
    return <></>;
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
            control={form.control as Control<object>}
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
};

export default WeeklyPicks;
