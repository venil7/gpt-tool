import { pipe } from "fp-ts/lib/function";
import * as t from "io-ts";
import { UUIDBrand } from "io-ts-types";
import { v4 as uuidv4 } from "uuid";
import { LogEntryDecoder } from "../decoders/log_entry";
import {
  ChatResponse,
  ChatRole,
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
  pipe(defaultSimpleRequest(), (r) =>
    logEntry(r, {
      id: "some id",
      created: new Date(),
      object: "message",
      usage: {
        completion_tokens: 0,
        prompt_tokens: 0,
        total_tokens: 0,
      },
      choices: [
        {
          index: 1,
          message: {
            role: ChatRole.Assistant,
            content: "string",
          },
          finish_reason: "string",
        },
      ],
    })
  );
