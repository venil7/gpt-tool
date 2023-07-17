import * as t from "io-ts";
import { DateFromISOString, UUID } from "io-ts-types";
import { ChatResponseDecoder, SimpleRequestDecoder } from "./openapi/chat";
import { nullableDecoder } from "./util";

export const LogEntryDecoder = t.type({
  id: nullableDecoder(UUID),
  request: SimpleRequestDecoder /*ChatRequestDecoder*/,
  response: nullableDecoder(ChatResponseDecoder),
  date: nullableDecoder(DateFromISOString),
});
