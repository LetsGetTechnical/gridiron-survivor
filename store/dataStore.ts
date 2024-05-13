import { create } from 'zustand';
import { produce } from 'immer';
import {
  INFLTeams,
  IUser,
  IUserWeeklyPick,
  IWeeklyPicks,
} from '@/api/IapiFunctions';

interface IDataStoreState {
  NFLTeams: INFLTeams;
  user: IUser;
  userWeeklyPick: IUserWeeklyPick;
  weeklyPicks: IWeeklyPicks;
}
interface IDataStoreAction {
  resetUser: () => void;
  updateNFLTeams: (
    teamName: INFLTeams['teamName'],
    teamLogo: INFLTeams['teamLogo'],
  ) => void;
  updateUser: (id: IUser['id'], email: IUser['email']) => void;
  updateUserWeeklyPick: (
    id: IUser['id'],
    weekNumber: IUserWeeklyPick['weekNumber'],
  ) => void;
  updateWeeklyPicks: (
    gameId: IWeeklyPicks['gameId'],
    gameWeekId: IWeeklyPicks['gameWeekId'],
    userResults: IWeeklyPicks['userResults'],
  ) => void;
}

export interface DataStore extends IDataStoreState, IDataStoreAction {}

const initialState: IDataStoreState = {
  NFLTeams: {
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
  updateNFLTeams: (teamName, teamLogo) =>
    set(
      produce((state: IDataStoreState) => {
        state.NFLTeams.teamName = teamName;
        state.NFLTeams.teamLogo = teamLogo;
      }),
    ),
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
