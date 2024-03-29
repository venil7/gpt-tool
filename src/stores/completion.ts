import { signal } from "@preact/signals-react";
import { of } from "fp-ts/lib/TaskEither";
import { Identity } from "../domain/action";
import { LogEntry, defaultLogEntry } from "../domain/log_entry";
import { createCompletion, getLogEntry } from "../services/completion";
import { StoreBase, createStoreBase } from "./base";

export type CompletionStore = Identity<
  StoreBase<LogEntry> & {
    new: () => Promise<unknown>;
    submit: (entry: LogEntry) => Promise<unknown>;
    get: (id: string) => Promise<unknown>;
  }
>;

export const createCompletionStore = (): CompletionStore => {
  const data = signal<LogEntry>(defaultLogEntry());
  const storeBase = createStoreBase(data);

  return {
    ...storeBase,
    new: () => {
      const resetAction = of(defaultLogEntry());
      return storeBase.update(resetAction);
    },
    submit: (entry: LogEntry) => {
      const submitAction = createCompletion(entry.request);
      return storeBase.update(submitAction);
    },
    get: (id: string) => {
      const getAction = getLogEntry(id);
      return storeBase.update(getAction);
    },
  };
};
