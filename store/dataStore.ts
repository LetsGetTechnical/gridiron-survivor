import { create } from 'zustand';
import { produce } from 'immer';

import {
  IUser,
  INFLTeams,
  IUserWeeklyPick,
  IWeeklyPicks,
} from '@/api/IapiFunctions';

interface IDataStoreState {
  user: IUser;
  NFLTeams: INFLTeams;
  userWeeklyPick: IUserWeeklyPick;
  weeklyPicks: IWeeklyPicks;
}
interface IDataStoreAction {
  updateUser: (id: IUser['id'], email: IUser['email']) => void;
  resetUser: () => void;
  updateNFLTeams: (
    teamName: INFLTeams['teamName'],
    teamLogo: INFLTeams['teamLogo'],
  ) => void;
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
  user: {
    id: '',
    email: '',
  },

  NFLTeams: {
    teamName: '',
    teamLogo: '',
  },
  userWeeklyPick: {
    userId: '',
    weekNumber: "",
  }, 
  weeklyPicks: {
    gameId: "",
    gameWeekId: "",
    userResults: "",
  }

};

export const useDataStore = create<DataStore>((set) => ({
  ...initialState,
  updateUser: (id, email) =>
    set(
      produce((state: IDataStoreState) => {
        state.user.id = id;
        state.user.email = email;
      }),
    ),
  resetUser: () => set({ user: initialState.user }),
  updateNFLTeams: (teamName, teamLogo) =>
    set(
      produce((state: IDataStoreState) => {
        state.NFLTeams.teamName = teamName;
        state.NFLTeams.teamLogo = teamLogo;
      }),
    ),
    updateUserWeeklyPick: (id, weekNumber) => 
    set(
      produce((state: IDataStoreState) => {
        state.user.id = id;
        state.userWeeklyPick.weekNumber = weekNumber
      })
    ),
    updateWeeklyPicks: (gameId, gameWeekId, userResults) => 
    set(
      produce((state: IDataStoreState) => {
        state.weeklyPicks.gameId = gameId;
        state.weeklyPicks.gameWeekId = gameWeekId;
        state.weeklyPicks.userResults = userResults;
      })
    )

}));
