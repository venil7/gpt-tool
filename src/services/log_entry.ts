import { chain } from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/function";
import * as t from "io-ts";
import { LogEntryDecoder } from "../decoders/log_entry";
import { taskEitherDecoder } from "../decoders/util";
import { Action } from "../domain/action";
import { LogEntry } from "../domain/log_entry";
import { createGet, createPost } from "./fetch";

const get = createGet();
const post = createPost();

const JSON_SERVER_URL = `http://localhost:${
  import.meta.env.VITE_JSON_SERVER_PORT as string
}/db`;

export const createJsonServerLogEntry = (
  logEntry: LogEntry
): Action<LogEntry> => {
  return pipe(
    post(`${JSON_SERVER_URL}/log`, LogEntryDecoder.encode(logEntry)),
    chain(taskEitherDecoder(LogEntryDecoder))
  );
};

export const getJsonServerLogEntries = (limit: number): Action<LogEntry[]> => {
  return pipe(
    get(`${JSON_SERVER_URL}/log?_sort=date&_order=desc&_limit=${limit}`),
    chain(taskEitherDecoder(t.array(LogEntryDecoder)))
  );
};

export const getJsonServerLogEntry = (id: string): Action<LogEntry> => {
  return pipe(
    get(`${JSON_SERVER_URL}/log/${id}`),
    chain(taskEitherDecoder(LogEntryDecoder))
  );
};
