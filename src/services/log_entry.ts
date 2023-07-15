import { chain } from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/function";
import * as t from "io-ts";
import { LogEntryDecoder } from "../decoders/log_entry";
import { taskEitherDecoder } from "../decoders/util";
import { Action } from "../domain/action";
import { LogEntry } from "../domain/log_entry";
import { createGet, createPost } from "./fetch";

const init: RequestInit = {
  headers: [
    ["Accept", "application/json"],
    ["Content-Type", "application/json"],
  ],
};

export const get = createGet(init);
export const post = createPost(init);

const URL = `http://localhost:${
  import.meta.env.VITE_JSON_SERVER_PORT ?? 5000
}/db`;

export const createLogEntry = (logEntry: LogEntry): Action<LogEntry> => {
  return pipe(
    post(`${URL}/log`, LogEntryDecoder.encode(logEntry)),
    chain(taskEitherDecoder(LogEntryDecoder))
  );
};

export const getLogEntries = (): Action<LogEntry[]> => {
  return pipe(
    get(`${URL}/log`),
    chain(taskEitherDecoder(t.array(LogEntryDecoder)))
  );
};
