import { create } from 'zustand';
import { produce } from 'immer';
import {
  INFLTeam,
  IUser,
  IUserWeeklyPick,
  IWeeklyPicks,
} from '@/api/IapiFunctions';

//Define the shape of the state
interface IDataStoreState {
  NFLTeam: INFLTeam;
  user: IUser;
  userWeeklyPick: IUserWeeklyPick;
  weeklyPicks: IWeeklyPicks;
}

//Define the actions that can be perfomed on the state
interface IDataStoreAction {
  resetUser: () => void;
  updateNFLTeam: ({ teamName, teamLogo }: INFLTeam) => void;
  updateUser: (id: IUser['id'], email: IUser['email']) => void;
  updateUserWeeklyPick: ({ userId, weekNumber }: IUserWeeklyPick) => void;
  updateWeeklyPicks: ({
    gameId,
    gameWeekId,
    userResults,
  }: IWeeklyPicks) => void;
}

export interface DataStore extends IDataStoreState, IDataStoreAction {}

//creating the initial state
const initialState: IDataStoreState = {
  NFLTeam: {
    teamName: '',
    teamLogo: '',
  },
  user: {
    id: '',
    email: '',
  },
  userWeeklyPick: {
    userId: '',
    weekNumber: '',
  },
  weeklyPicks: {
    gameId: '',
    gameWeekId: '',
    userResults: '',
  },
};

//create the store
export const useDataStore = create<DataStore>((set) => ({
  ...initialState,
  resetUser: () => set({ user: initialState.user }),
  updateNFLTeam: ({ teamName, teamLogo }: INFLTeam): void =>
    set(
      produce((state: IDataStoreState) => {
        {
          state.NFLTeam.teamName = teamName;
          state.NFLTeam.teamLogo = teamLogo;
        }
      }),
    ),
  updateUser: (id, email) =>
    set(
      produce((state: IDataStoreState) => {
        state.user.id = id;
        state.user.email = email;
      }),
    ),
  updateUserWeeklyPick: ({ userId, weekNumber }: IUserWeeklyPick): void =>
    set(
      produce((state: IDataStoreState) => {
        state.user.id = userId;
        state.userWeeklyPick.weekNumber = weekNumber;
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
      })
    ),
}));
