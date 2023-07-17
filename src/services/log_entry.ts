import { chain } from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/function";
import * as t from "io-ts";
import { LogEntryDecoder } from "../decoders/log_entry";
import { taskEitherDecoder } from "../decoders/util";
import { Action } from "../domain/action";
import { LogEntry } from "../domain/log_entry";
import { createGet, createPost, jsonInit } from "./fetch";

const get = createGet(jsonInit);
const post = createPost(jsonInit);

const URL = `http://localhost:${
  import.meta.env.VITE_JSON_SERVER_PORT as string
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
