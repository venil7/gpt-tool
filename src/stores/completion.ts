import { signal } from "@preact/signals-react";
import { Identity } from "../domain/action";
import { LogEntry, defaultLogEntry } from "../domain/log_entry";
import { createCompletion } from "../services/completion";
import { StoreBase, createStoreBase } from "./base";

export type CompletionStore = Identity<
  StoreBase<LogEntry> & {
    submit: (entry: LogEntry) => Promise<unknown>;
  }
>;

export const createCompletionStore = (): CompletionStore => {
  const data = signal<LogEntry>(defaultLogEntry());
  const storeBase = createStoreBase(data);

  return {
    ...storeBase,
    submit: (entry: LogEntry) => {
      const submitAction = createCompletion(entry.request);
      return storeBase.update(submitAction);
    },
  };
};
