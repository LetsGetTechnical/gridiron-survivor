import { create } from 'zustand';
import { produce } from 'immer';

import { IWeeklyPicks, INFLTeams, IUserWeeklyPick } from '@/api/IapiFunctions';

interface State {
  user: {
    id: string | null;
    email: string | null;
  };

  NFLTeams: INFLTeams;
  weeklyPicks: IWeeklyPicks;
  userPicks: IUserWeeklyPick;
}

interface Action {
  updateUserId: (id: State['user']['id']) => void;
  updateUserEmail: (email: State['user']['email']) => void;
  reset: () => void;


}

export interface DataStore extends State, Action {}

const initialState: State = {
  user: {
    id: null,
    email: null,
  },

  NFLTeams: {
    teamName: "",
    teamLogo: ""
  }
};

export const useDataStore = create<DataStore>((set) => ({
  ...initialState,
  updateUserId: (id) =>
    set(
      produce((state: State) => {
        state.user.id = id;
      }),
    ),
  updateUserEmail: (email) =>
    set(
      produce((state: State) => {
        state.user.email = email;
      }),
    ),
  reset: () => set(initialState),
}));
