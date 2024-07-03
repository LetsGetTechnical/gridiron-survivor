// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { create } from 'zustand';
import { produce } from 'immer';
import {
  INFLTeam,
  IUser,
  IWeeklyPicks,
  ILeague,
  IGameWeek,
} from '@/api/apiFunctions.interface';

//Define the shape of the state
interface IDataStoreState {
  user: IUser;
  NFLTeam: INFLTeam[];
  weeklyPicks: IWeeklyPicks;
  leagues: ILeague[];
  gameWeek: IGameWeek;
}

/* eslint-disable */
// eslint is disabled because the functions are not used in the type interface
//Define the actions that can be performed on the state
interface IDataStoreAction {
  resetUser: () => void;
  updateNFLTeam: (updatedTeam: INFLTeam[]) => void;
  updateUser: (
    id: IUser['id'],
    email: IUser['email'],
    leagues: IUser['leagues'],
  ) => void;
  updateWeeklyPicks: ({
    leagueId,
    gameWeekId,
    userResults,
  }: IWeeklyPicks) => void;
  updateLeagues: (updatedLeagues: ILeague[]) => void;
  updateGameWeek: (gameWeek: IGameWeek) => void;
}
/* eslint-disable */

export interface DataStore extends IDataStoreState, IDataStoreAction {}

//creating the initial state
const initialState: IDataStoreState = {
  NFLTeam: [],
  user: {
    id: '',
    email: '',
    leagues: [],
  },
  weeklyPicks: {
    leagueId: '',
    gameWeekId: '',
    userResults: {},
  },
  leagues: [],
  gameWeek: {
    id: '',
    week: 0,
  },
};

//create the store
export const useDataStore = create<DataStore>((set) => ({
  ...initialState,
  /**
   * Reset the user state
   * @returns {void}
   */
  resetUser: (): void => set({ user: initialState.user }),
  /**
   * Update the NFL team
   * @param updatedTeam - The updated team
   * @returns {void}
   */
  updateNFLTeam: (updatedTeam: INFLTeam[]): void =>
    set(
      produce((state: IDataStoreState) => ({
        NFLTeam: [...state.NFLTeam, ...updatedTeam],
      })),
    ),
  /**
   * Update the user
   * @param id - The user id
   * @param email - The user email
   * @param leagues - The user league
   * @returns {void}
   */
  updateUser: (id, email, leagues): void =>
    set(
      produce((state: IDataStoreState) => {
        state.user.id = id;
        state.user.email = email;
        state.user.leagues = [...leagues];
      }),
    ),
  /**
   * Update the weekly picks
   * @param props - props
   * @param props.leagueId - The league id
   * @param props.gameWeekId - The game week id
   * @param props.userResults - The user results
   * @returns {void}
   */
  updateWeeklyPicks: ({
    leagueId,
    gameWeekId,
    userResults,
  }: IWeeklyPicks): void =>
    set(
      produce((state: IDataStoreState) => {
        state.weeklyPicks.leagueId = leagueId;
        state.weeklyPicks.gameWeekId = gameWeekId;
        state.weeklyPicks.userResults = userResults;
      }),
    ),
  /**
   * Update the game group
   * @param props - props
   * @param props.updatedLeagues - List of all user leagues and associated information
   * @returns {void}
   */
  updateLeagues: (updatedLeagues: ILeague[]): void =>
    set(
      produce((state: IDataStoreState) => ({
        leagues: [...updatedLeagues],
      })),
    ),
  /**
   * Update the current week
   * @param props - props
   * @param props.id - The id
   * @param props.week - The week
   * @returns {void}
   */
  updateGameWeek: ({ id, week }: IGameWeek): void =>
    set(
      produce((state: IDataStoreState) => {
        state.gameWeek.id = id;
        state.gameWeek.week = week;
      }),
    ),
}));
