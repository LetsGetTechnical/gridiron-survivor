import { create } from 'zustand';
import { produce } from 'immer';
import {
  INFLTeam,
  IUser,
  IUserWeeklyPick,
  IWeeklyPicks,
} from '@/api/IapiFunctions';

interface IDataStoreState {
  NFLTeam: INFLTeam;
  user: IUser;
  userWeeklyPick: IUserWeeklyPick;
  weeklyPicks: IWeeklyPicks;
}
interface IDataStoreAction {
  resetUser: () => void;
  updateNFLTeam: (NFLTeam: { teamName: string; teamLogo: string }) => void;
  updateUser: (id: IUser['id'], email: IUser['email']) => void;
  updateUserWeeklyPick: (
    id: IUser['id'],
    weekNumber: IUserWeeklyPick['weekNumber'],
  ) => void;
  updateWeeklyPicks: (weeklyPicks: {
    gameId: string;
    gameWeekId: string;
    userResults: string;
  }) => void;
}

export interface DataStore extends IDataStoreState, IDataStoreAction {}

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

export const useDataStore = create<DataStore>((set) => ({
  ...initialState,
  resetUser: () => set({ user: initialState.user }),
  updateNFLTeam: ({ teamName, teamLogo }) =>
    set({ NFLTeam: { teamName, teamLogo } }),
  updateUser: (id, email) =>
    set(
      produce((state: IDataStoreState) => {
        state.user.id = id;
        state.user.email = email;
      }),
    ),
  updateUserWeeklyPick: (id, weekNumber) =>
    set(
      produce((state: IDataStoreState) => {
        state.user.id = id;
        state.userWeeklyPick.weekNumber = weekNumber;
      }),
    ),
  updateWeeklyPicks: (gameId, gameWeekId, userResults) =>
    set(
      produce((state: IDataStoreState) => {
        state.weeklyPicks.gameId = gameId;
        state.weeklyPicks.gameWeekId = gameWeekId;
        state.weeklyPicks.userResults = userResults;
      }),
    ),
}));
