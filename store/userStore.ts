import { create } from 'zustand';

const userStore = ( ) => ({
    example: []
});

const useUser = create(userStore);

export default useUser;