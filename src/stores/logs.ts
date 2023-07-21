import { signal } from "@preact/signals-react";
import { Identity } from "../domain/action";
import { LogEntry } from "../domain/log_entry";
import { getLogEntries } from "../services/completion";
import { StoreBase, createStoreBase } from "./base";

export type LogsStore = Identity<
  StoreBase<LogEntry[]> & {
    get: (num: number) => Promise<unknown>;
  }
>;

export const createLogsStore = (): LogsStore => {
  const data = signal<LogEntry[]>([]);
  const storeBase = createStoreBase(data);

  return {
    ...storeBase,
    get: (num = 10) => {
      const getLogsActions = getLogEntries(num);
      return storeBase.update(getLogsActions);
    },
  };
};
