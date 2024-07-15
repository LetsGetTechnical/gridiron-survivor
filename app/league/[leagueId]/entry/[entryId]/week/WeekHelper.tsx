// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React, { ChangeEvent } from 'react';
import { IWeekProps } from './Week.interface';
import { createWeeklyPicks } from '@/api/apiFunctions';
import { parseUserPick } from '@/utils/utils';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { toast } from 'react-hot-toast';

/**
 * Handles the form submission.
 * @param data - The form data.
 * @returns {void}
 */
const onWeeklyPickChange = async ({
  data,
}: {
  data: ChangeEvent<HTMLInputElement>;
}): Promise<void> => {
  try {
    const teamSelect = data.target.value;
    const teamID = NFLTeams.find(
      (team) => team.teamName === teamSelect,
    )?.teamName;

    const currentUserPick = parseUserPick(user.id, entry, teamID || '');

    // combines current picks and the user pick into one object.
    // if the user pick exists then it overrides the pick of the user.
    const updatedWeeklyPicks = {
      ...weeklyPicks.userResults,
      [user.id]: {
        ...weeklyPicks.userResults[user.id],
        [entry]: {
          ...weeklyPicks.userResults[user.id]?.[entry],
          ...currentUserPick[user.id][entry],
        },
      },
    };

    // update weekly picks in the database
    await createWeeklyPicks({
      leagueId: league,
      gameWeekId: week,
      userResults: updatedWeeklyPicks,
    });

    // update weekly picks in the data store
    updateWeeklyPicks({
      leagueId: league,
      gameWeekId: week,
      userResults: updatedWeeklyPicks,
    });

    setUserPick(currentUserPick[user.id][entry].teamName);

    toast.custom(
      <Alert
        variant={AlertVariants.Success}
        message="You've successfully picked your team!"
      />,
    );
  } catch (error) {
    console.error('Submission error:', error);
    toast.custom(
      <Alert
        variant={AlertVariants.Error}
        message="There was an error processing your request."
      />,
    );
  }
};
