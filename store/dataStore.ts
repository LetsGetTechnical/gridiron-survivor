import { create } from 'zustand';
import { produce } from 'immer';
import {
  INFLTeam,
  IUser,
  IWeeklyPicks,
  ILeague,
  IGameWeek,
} from '@/api/IapiFunctions';

//Define the shape of the state
interface IDataStoreState {
  user: IUser;
  NFLTeam: INFLTeam[];
  weeklyPicks: IWeeklyPicks;
  league: ILeague;
  gameWeek: IGameWeek;
}

//Define the actions that can be performed on the state
interface IDataStoreAction {
  resetUser: () => void;
  updateNFLTeam: (updatedTeam: INFLTeam[]) => void;
  updateUser: (
    id: IUser['id'],
    email: IUser['email'],
    league: IUser['league'],
  ) => void;
  updateWeeklyPicks: ({
    leagueId,
    gameWeekId,
    userResults,
  }: IWeeklyPicks) => void;
  updateLeague: ({ leagueId, participants, survivors }: ILeague) => void;
  updateGameWeek: (gameWeek: IGameWeek) => void;
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
    leagueId: '',
    gameWeekId: '',
    userResults: {},
  },
  league: {
    leagueId: '',
    participants: [],
    survivors: [],
  },
  gameWeek: {
    id: '',
    week: 0,
  },
};

//create the store
export const useDataStore = create<DataStore>((set) => ({
  ...initialState,
  resetUser: () => set({ user: initialState.user }),
  updateNFLTeam: (teams: INFLTeam[]): void =>
    set(
      produce((state: IDataStoreState) => ({
        NFLTeam: [...state.NFLTeam, ...teams],
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
  updateLeague: ({ leagueId, participants, survivors }: ILeague): void =>
    set(
      produce((state: IDataStoreState) => {
        state.league.leagueId = leagueId;
        state.league.participants = participants;
        state.league.survivors = survivors;
      }),
    ),
  updateGameWeek: ({ id, week }: IGameWeek): void =>
    set(
      produce((state: IDataStoreState) => {
        state.gameWeek.id = id;
        state.gameWeek.week = week;
      }),
    ),
}));
