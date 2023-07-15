import * as t from "io-ts";
import { DateFromISOString, UUID } from "io-ts-types";
import { ChatRequestDecoder, ChatResponseDecoder } from "./openapi/chat";

export const LogEntryDecoder = t.type({
  id: UUID,
  request: ChatRequestDecoder,
  response: ChatResponseDecoder,
  date: DateFromISOString,
});
