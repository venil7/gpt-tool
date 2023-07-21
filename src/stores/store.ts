import { CompletionStore, createCompletionStore } from "./completion";
import { LogsStore, createLogsStore } from "./logs";

export type Store = {
  entry: CompletionStore;
  logs: LogsStore;
};

export const createStore = (): Store => ({
  entry: createCompletionStore(),
  logs: createLogsStore(),
});
