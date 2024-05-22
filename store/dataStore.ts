import { create } from 'zustand';
import { produce } from 'immer';
import { INFLTeam, IUser, IWeeklyPicks, IUserGameWeek } from '@/api/IapiFunctions';

//Define the shape of the state
interface IDataStoreState {
  NFLTeam: INFLTeam;
  user: IUser;
  weeklyPicks: IWeeklyPicks;
  currentWeek: IUserGameWeek;
}

//Define the actions that can be performed on the state
interface IDataStoreAction {
  resetUser: () => void;
  updateNFLTeam: ({ teamName, teamLogo }: INFLTeam) => void;
  updateUser: (id: IUser['id'], email: IUser['email']) => void;
  updateWeeklyPicks: ({
    gameId,
    gameWeekId,
    userResults,
  }: IWeeklyPicks) => void;
  updateCurrentWeek: ({gameCurrentWeek}: IUserGameWeek) => void;
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
  weeklyPicks: {
    gameId: '',
    gameWeekId: '',
    userResults: {},
  },
  currentWeek: {
    gameCurrentWeek: ''
  }
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
    updateCurrentWeek: ({
      gameCurrentWeek,
    }: IUserGameWeek): void => 
    set(
      produce((state: IDataStoreState) => {
        state.currentWeek.gameCurrentWeek = gameCurrentWeek;
      })
    )
}));
