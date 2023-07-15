import * as t from "io-ts";
import { UUIDBrand } from "io-ts-types";
import { v4 as uuidv4 } from "uuid";
import { LogEntryDecoder } from "../decoders/log_entry";
import { ChatRequest, ChatResponse } from "./openapi/chat";

export type LogEntry = t.TypeOf<typeof LogEntryDecoder>;

export const logEntry = (
  request: ChatRequest,
  response: ChatResponse
): LogEntry => ({
  request,
  response,
  date: new Date(),
  id: uuidv4() as unknown as t.Branded<string, UUIDBrand>,
});
