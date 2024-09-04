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
  IAllLeagues,
} from '@/api/apiFunctions.interface';

//Define the shape of the state
interface IDataStoreState {
  user: IUser;
  NFLTeam: INFLTeam[];
  weeklyPicks: IWeeklyPicks;
  league: ILeague;
  gameWeek: IGameWeek;
  allLeagues: IAllLeagues;
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
    selectedLeagues?: IUser['selectedLeagues'],
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
  updateAllLeagues: (allLeagues: IAllLeagues) => void;
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
    selectedLeagues: [],
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
  allLeagues: {
    leagueId: '',
    leagueName: '',
    logo: '',
    participants: [],
    survivors: [],
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
   * @param selectedLeagues - The user selected league
   * @returns {void}
   */
  updateUser: (id, email, leagues, selectedLeagues): void =>
    set(
      produce((state: IDataStoreState) => {
        state.user.id = id;
        state.user.email = email;
        state.user.leagues = [...leagues];
        state.user.selectedLeagues = selectedLeagues;
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
   * @param {IAllLeagues} props - The league properties to update.
   * @param {string} props.leagueId - The ID of the league.
   * @param {string} props.leagueName - The name of the league.
   * @param {string} props.logo - The logo of the league.
   * @param {any[]} props.participants - The participants of the league.
   * @param {any[]} props.survivors - The survivors of the league.
   * @returns {void}
   */
  updateAllLeagues: ({
    leagueId,
    leagueName,
    logo,
    participants,
    survivors,
  }: IAllLeagues): void =>
    set(
      produce((state: IDataStoreState) => {
        state.allLeagues.leagueId = leagueId;
        state.allLeagues.leagueName = leagueName;
        state.allLeagues.logo = logo;
        state.allLeagues.participants = participants;
        state.allLeagues.survivors = survivors;
      }),
    ),
}));
