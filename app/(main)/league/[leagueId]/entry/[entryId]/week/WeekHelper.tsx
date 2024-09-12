// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import React from 'react';
import {
  createWeeklyPicks,
  getCurrentUserEntries,
  updateEntry,
} from '@/api/apiFunctions';
import { parseUserPick } from '@/utils/utils';
import Alert from '@/components/AlertNotification/AlertNotification';
import { AlertVariants } from '@/components/AlertNotification/Alerts.enum';
import { toast } from 'react-hot-toast';
import { IWeeklyPickChange } from './Week.interface';

/**
 * Handles the weekly pick team change.
 * @param props - teamSelect, NFLTeams, user, entry, weeklyPicks, league, week, updateWeeklyPicks, setUserPick
 * @param props.teamSelect - The selected team name
 * @param props.NFLTeams - Props for NFL teams
 * @param props.user - Props for user
 * @param props.entry - Prop for the entry string
 * @param props.weeklyPicks - Props for the weeklyPicks
 * @param props.league - Prop value for the leagueId in createWeeklyPicks
 * @param props.week - Prop value for gameWeekId in updateWeeklyPicks
 * @param props.updateWeeklyPicks - Prop for the updateWeeklyPicks function
 * @param props.setUserPick - Prop for the setUserPick function
 * @param props.setLoadingTeamName - Prop for the setLoadingTeamName state
 * @returns {void}
 */
export const onWeeklyPickChange = async ({
  teamSelect,
  entry,
  league,
  NFLTeams,
  setUserPick,
  updateWeeklyPicks,
  user,
  weeklyPicks,
  week,
  setLoadingTeamName: setLoadingTeamName,
}: IWeeklyPickChange): Promise<void> => {
  try {
    const team = NFLTeams.find((team) => team.teamName === teamSelect);

    setLoadingTeamName(team?.teamId ?? null);

    const currentUserPick = parseUserPick(user.id, entry, team?.teamName || '');

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

    const leagueEntryData = await getCurrentUserEntries(user.id, league);

    const currentEntry = leagueEntryData.find(
      (leagueEntry) => leagueEntry.$id === entry,
    );

    const currentEntrySelectedTeams = currentEntry?.selectedTeams || [];
    currentEntrySelectedTeams[parseInt(week) - 1] = teamSelect;
    await updateEntry({
      entryId: entry,
      selectedTeams: currentEntrySelectedTeams,
    });

    // update weekly picks in the data store
    updateWeeklyPicks({
      leagueId: league,
      gameWeekId: week,
      userResults: updatedWeeklyPicks,
    });

    const teamName = currentUserPick[user.id][entry].teamName.teamName;

    setUserPick(teamName);

    toast.custom(
      <Alert
        variant={AlertVariants.Success}
        message={`You have successfully pick the ${
          currentUserPick[user.id][entry].teamName
        } for your team!`}
      />,
    );
  } catch (error) {
    console.error('There was an error handling your request:', error);
    toast.custom(
      <Alert
        variant={AlertVariants.Error}
        message="There was an error processing your request."
      />,
    );
  } finally {
    setLoadingTeamName(null);
  }
};
