import { create } from 'zustand';

interface Example {
    id: number;
    name: string;
}
interface ExampleStore {
    examples: Example[];
}

const dataStore = () => ({
    examples: [],
})

const useDataStore = create<ExampleStore>(dataStore)

export default useDataStore;