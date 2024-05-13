import { create } from 'zustand';
import { produce } from 'immer';
import { IUser } from '@/api/IapiFunctions';

interface IDataStoreState {
  user: IUser;
}

interface IDataStoreAction {
  updateUser: (id: IUser['id'], email: IUser['email']) => void;
  resetUser: () => void;
}

export interface DataStore extends IDataStoreState, IDataStoreAction {}

const initialState: IDataStoreState = {
  user: {
    id: '',
    email: '',
  },
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
}));
