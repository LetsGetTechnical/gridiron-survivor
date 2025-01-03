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
  currentWeek: number;
  user: IUser;
  NFLTeams: INFLTeam[];
  weeklyPicks: IWeeklyPicks;
  league: ILeague;
  gameWeek: IGameWeek;
  allLeagues: ILeague[];
}

/* eslint-disable */
// eslint is disabled because the functions are not used in the type interface
//Define the actions that can be performed on the state
interface IDataStoreAction {
  resetUser: () => void;
  updateCurrentWeek: (week: number) => void;
  updateNFLTeams: (updatedTeam: INFLTeam[]) => void;
  updateUser: (
    documentId: IUser['documentId'],
    id: IUser['id'],
    email: IUser['email'],
    leagues: IUser['leagues'],
    labels: IUser['labels'],
  ) => void;
  updateWeeklyPicks: ({
    leagueId,
    gameWeekId,
    userResults,
  }: IWeeklyPicks) => void;
  updateLeague: ({
    leagueId,
    logo,
    leagueName,
    participants,
    survivors,
  }: ILeague) => void;
  updateGameWeek: (gameWeek: IGameWeek) => void;
  updateAllLeagues: (allLeagues: ILeague[]) => void;
}
/* eslint-disable */

export interface DataStore extends IDataStoreState, IDataStoreAction {}

//creating the initial state
const initialState: IDataStoreState = {
  currentWeek: 1,
  NFLTeams: [],
  user: {
    documentId: '',
    id: '',
    email: '',
    leagues: [],
    labels: [],
  },
  weeklyPicks: {
    leagueId: '',
    gameWeekId: '',
    userResults: {},
  },
  league: {
    leagueId: '',
    leagueName: '',
    logo: '',
    participants: [],
    survivors: [],
  },
  gameWeek: {
    id: '',
    week: 0,
  },
  allLeagues: [],
};

//create the store
export const useDataStore = create<DataStore>((set) => ({
  ...initialState,
  updateCurrentWeek: (week: number): void => set({ currentWeek: week }),
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
  updateNFLTeams: (updatedTeams: INFLTeam[]): void =>
    set(
      produce((state: IDataStoreState) => ({
        NFLTeams: [...state.NFLTeams, ...updatedTeams],
      })),
    ),
  /**
   * Update the user
   * @param id - The user id
   * @param email - The user email
   * @param leagues - The user league
   * @param selectedLeagues - The user selected league
   * @returns {void}
   */
  updateUser: (documentId, id, email, leagues, labels): void =>
    set(
      produce((state: IDataStoreState) => {
        state.user.documentId = documentId;
        state.user.id = id;
        state.user.email = email;
        state.user.leagues = [...leagues];
        state.user.labels = [...labels];
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
   * @param props.leagueId - The league id
   * @param props.leagueName - The league name
   * @param props.logo - The logo
   * @param props.participants - The participants
   * @param props.survivors - The survivors
   * @returns {void}
   */
  updateLeague: ({
    leagueId,
    leagueName,
    logo,
    participants,
    survivors,
  }: ILeague): void =>
    set(
      produce((state: IDataStoreState) => {
        state.league.leagueId = leagueId;
        state.league.leagueName = leagueName;
        state.league.logo = logo;
        state.league.participants = participants;
        state.league.survivors = survivors;
      }),
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
  /**
   * Updates all leagues in the data store.
   *
   * @param {IAllLeagues} props - The league properties to update..
   * @returns {void}
   */
  updateAllLeagues: (updatedLeagues: ILeague[]): void =>
    set(
      produce((state: IDataStoreState) => {
        state.allLeagues = [...state.allLeagues, ...updatedLeagues];
      }),
    ),
}));
