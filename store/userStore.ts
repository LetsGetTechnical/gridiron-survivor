import { create } from 'zustand';

const userStore = (set, get) => ({
    example: []
});

const useUser = create(userStore);

export default useUser;