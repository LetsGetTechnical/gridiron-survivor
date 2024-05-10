import { create } from 'zustand';
import { produce } from 'immer';
import { IUser } from '@/api/IapiFunctions';

interface State {
  user: IUser;
}

interface Action {
  updateUser: (id: State['user']['id'], email: State['user']['email']) => void;
  reset: () => void;
}

export interface DataStore extends State, Action {}

const initialState: State = {
  user: {
    id: '',
    email: '',
  },
};

export const useDataStore = create<DataStore>((set) => ({
  ...initialState,
  updateUser: (id, email) =>
    set(
      produce((state: State) => {
        state.user.id = id;
        state.user.email = email;
      }),
    ),
  reset: () => set(initialState),
}));
