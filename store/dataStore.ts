import { create } from 'zustand';
import { produce } from 'immer';
import {
  INFLTeam,
  IUser,
  IWeeklyPicks,
  IGameGroup,
  IGameWeek,
} from '@/api/IapiFunctions';

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
  updateUser: (
    id: IUser['id'],
    email: IUser['email'],
    league: IUser['league'],
  ) => void;
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
    league: [],
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
  resetUser: () => set({ user: initialState.user }),
  updateNFLTeam: (updatedTeam: INFLTeam): void =>
    set(
      produce((state: IDataStoreState) => ({
        NFLTeam: [...state.NFLTeam, updatedTeam],
      })),
    ),
  updateUser: (id, email, league) =>
    set(
      produce((state: IDataStoreState) => {
        state.user.id = id;
        state.user.email = email;
        state.user.league = [...league];
      }),
    ),
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
  updateCurrentWeek: ({ id, week }: IGameWeek): void =>
    set(
      produce((state: IDataStoreState) => {
        state.gameCurrentWeek.id = id;
        state.gameCurrentWeek.week = week;
      }),
    ),
}));
