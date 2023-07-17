import { pipe } from "fp-ts/lib/function";
import * as t from "io-ts";
import { UUIDBrand } from "io-ts-types";
import { v4 as uuidv4 } from "uuid";
import { LogEntryDecoder } from "../decoders/log_entry";
import {
  ChatResponse,
  SimpleRequest,
  defaultSimpleRequest,
} from "./openapi/chat";

export type LogEntry = t.TypeOf<typeof LogEntryDecoder>;

export const logEntry = (
  request: SimpleRequest,
  response?: ChatResponse
): LogEntry => ({
  request,
  response,
  date: new Date(),
  id: uuidv4() as unknown as t.Branded<string, UUIDBrand>,
});

export const defaultLogEntry = (): LogEntry =>
  pipe(defaultSimpleRequest(), logEntry);
