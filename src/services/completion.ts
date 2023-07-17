import { chain } from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/function";
import * as t from "io-ts";
import { LogEntryDecoder } from "../decoders/log_entry";
import { SimpleRequestDecoder } from "../decoders/openapi/chat";
import { taskEitherDecoder } from "../decoders/util";
import { Action } from "../domain/action";
import { LogEntry } from "../domain/log_entry";
import { SimpleRequest } from "../domain/openapi/chat";
import { createGet, createPost, jsonInit } from "./fetch";

const get = createGet(jsonInit);
const post = createPost(jsonInit);

const URL = `http://localhost:${import.meta.env.VITE_API_PORT as string}`;

export const createCompletion = (
  simpleReq: SimpleRequest
): Action<LogEntry> => {
  return pipe(
    post(`${URL}/chat/completion`, SimpleRequestDecoder.encode(simpleReq)),
    chain(taskEitherDecoder(LogEntryDecoder))
  );
};

export const getLogEntries = (): Action<LogEntry[]> => {
  return pipe(
    get(`${URL}/chat/logs`),
    chain(taskEitherDecoder(t.array(LogEntryDecoder)))
  );
};
