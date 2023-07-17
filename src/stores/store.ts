import { CompletionStore, createCompletionStore } from "./completion";

export type Store = {
  entry: CompletionStore;
};

export const createStore = (): Store => ({
  entry: createCompletionStore(),
});
