import { create } from 'zustand';
import { produce } from 'immer';
import { Iuser, INFLTeams, IallTeamPicks, IuserPick } from './IdataStore';

interface Action {
  updateUserId: (id: Iuser['id']) => void;
  updateUserEmail: (email: Iuser['email']) => void;
  reset: () => void;
}

export interface DataStore extends Iuser, Action {}

const initialState: Iuser = {
    id: null,
    email: null,
};

export const useDataStore = create<DataStore>((set) => ({
  ...initialState,
  updateUserId: (id) =>
    set(
      produce((state: Iuser) => {
        state.id = id;
      }),
    ),
  updateUserEmail: (email) =>
    set(
      produce((state: Iuser) => {
        state.email = email;
      }),
    ),
  reset: () => set(initialState),
}));
