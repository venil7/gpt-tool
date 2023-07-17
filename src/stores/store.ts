import { EntryStore, createEntryStore } from "./entry";

export type Store = {
  entry: EntryStore;
};

export const createStore = (): Store => ({
  entry: createEntryStore(),
});
