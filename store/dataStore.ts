// Copyright (c) Gridiron Survivor.
// Licensed under the MIT License.

import { create } from 'zustand';
import { produce } from 'immer';
import {
  INFLTeam,
  IUser,
  IWeeklyPicks,
  IGameGroup,
  IGameWeek,
} from '@/api/apiFunctions.interface';

//Define the shape of the state
interface IDataStoreState {
  NFLTeam: INFLTeam[];
  user: IUser;
  weeklyPicks: IWeeklyPicks;
  gameGroup: IGameGroup;
  gameCurrentWeek: IGameWeek;
}

//Define the actions that can be performed on the state
interface IDataStoreAction {
  resetUser: () => void;
  updateNFLTeam: (updatedTeam: INFLTeam) => void;
  updateUser: (id: IUser['id'], email: IUser['email']) => void;
  updateWeeklyPicks: ({
    gameId,
    gameWeekId,
    userResults,
  }: IWeeklyPicks) => void;
  updateGameGroup: ({
    currentGameId,
    participants,
    survivors,
  }: IGameGroup) => void;
  updateCurrentWeek: (gameCurrentWeek: IGameWeek) => void;
}

export interface DataStore extends IDataStoreState, IDataStoreAction {}

//creating the initial state
const initialState: IDataStoreState = {
  NFLTeam: [],
  user: {
    id: '',
    email: '',
  },
  weeklyPicks: {
    gameId: '',
    gameWeekId: '',
    userResults: {},
  },
  gameGroup: {
    currentGameId: '',
    participants: [],
    survivors: [],
  },
  gameCurrentWeek: {
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
  updateNFLTeam: (updatedTeam: INFLTeam): void =>
    set(
      produce((state: IDataStoreState) => ({
        NFLTeam: [...state.NFLTeam, updatedTeam],
      })),
    ),
  /**
   * Update the user
   * @param id - The user id
   * @param email - The user email
   * @returns {void}
   */
  updateUser: (id, email): void =>
    set(
      produce((state: IDataStoreState) => {
        state.user.id = id;
        state.user.email = email;
      }),
    ),
  /**
   * Update the weekly picks
   * @param props - props
   * @param props.gameId - The game id
   * @param props.gameWeekId - The game week id
   * @param props.userResults - The user results
   * @returns {void}
   */
  updateWeeklyPicks: ({
    gameId,
    gameWeekId,
    userResults,
  }: IWeeklyPicks): void =>
    set(
      produce((state: IDataStoreState) => {
        state.weeklyPicks.gameId = gameId;
        state.weeklyPicks.gameWeekId = gameWeekId;
        state.weeklyPicks.userResults = userResults;
      }),
    ),
  /**
   * Update the game group
   * @param props - props
   * @param props.currentGameId - The current game id
   * @param props.participants - The participants
   * @param props.survivors - The survivors
   * @returns {void}
   */
  updateGameGroup: ({
    currentGameId,
    participants,
    survivors,
  }: IGameGroup): void =>
    set(
      produce((state: IDataStoreState) => {
        state.gameGroup.currentGameId = currentGameId;
        state.gameGroup.participants = participants;
        state.gameGroup.survivors = survivors;
      }),
    ),
  /**
   * Update the current week
   * @param props - props
   * @param props.id - The id
   * @param props.week - The week
   * @returns {void}
   */
  updateCurrentWeek: ({ id, week }: IGameWeek): void =>
    set(
      produce((state: IDataStoreState) => {
        state.gameCurrentWeek.id = id;
        state.gameCurrentWeek.week = week;
      }),
    ),
}));
