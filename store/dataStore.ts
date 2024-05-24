import { create } from 'zustand';
import { produce } from 'immer';
import { INFLTeam, IUser, IWeeklyPicks, IGameGroup, IGameWeek } from '@/api/IapiFunctions';

//Define the shape of the state
interface IDataStoreState {
  NFLTeam: INFLTeam;
  user: IUser;
  weeklyPicks: IWeeklyPicks;
  gameGroup: IGameGroup;
  currentWeek: IGameWeek;
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
  updateGameGroup: ({currentGameId, participants, survivors}: IGameGroup) => void;
  updateCurrentWeek: (gameCurrentWeek: IGameWeek) => void;
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
  gameGroup: {
    currentGameId: '',
    participants: [],
    survivors: [],
  },
  currentWeek: {
    gameCurrentWeek: 0,
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
    updateGameGroup: ({
      currentGameId,
      participants,
      survivors,    
    }: IGameGroup): void => set(
      produce((state: IDataStoreState) => {
        state.gameGroup.currentGameId = currentGameId;
        state.gameGroup.participants = participants;
        state.gameGroup.survivors = survivors;
      }),
    ),
    updateCurrentWeek: ({
      gameCurrentWeek,
    }: IGameWeek): void => 
    set(
      produce((state: IDataStoreState) => {
        state.currentWeek.gameCurrentWeek = gameCurrentWeek;
      })
    )
}));
