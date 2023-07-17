import { signal } from "@preact/signals-react";
import { Identity } from "../domain/action";
import { LogEntry, defaultLogEntry } from "../domain/log_entry";
import { StoreBase, createStoreBase } from "./base";

export type EntryStore = Identity<StoreBase<LogEntry>>;

export const createEntryStore = (): EntryStore => {
  const data = signal<LogEntry>(defaultLogEntry());
  const storeBase = createStoreBase(data);

  return {
    ...storeBase,
  };
};
