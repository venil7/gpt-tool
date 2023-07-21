import * as t from "io-ts";
import { UUID } from "io-ts-types";
import { ChatResponseDecoder, SimpleRequestDecoder } from "./openapi/chat";
import { dateDecoder, nullableDecoder } from "./util";

export const LogEntryDecoder = t.type({
  id: nullableDecoder(UUID),
  request: SimpleRequestDecoder,
  response: nullableDecoder(ChatResponseDecoder),
  date: nullableDecoder(dateDecoder()),
});
