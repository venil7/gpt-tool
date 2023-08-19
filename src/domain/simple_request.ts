import { count } from "@wordpress/wordcount";
import { pipe } from "fp-ts/lib/function";
import * as t from "io-ts";
import { SimpleRequestDecoder } from "../decoders/openapi/chat";
import { ChatCompletionsModel, fromSimpleRequest } from "./chat";

export type SimpleRequest = t.TypeOf<typeof SimpleRequestDecoder>;

export const defaultSimpleRequest = (): SimpleRequest => ({
  model: ChatCompletionsModel.GPT35_TURBO_16K,
  system: "",
  user: "",
});

export const numWords = (sr: SimpleRequest): number =>
  pipe(
    sr,
    fromSimpleRequest,
    (chatReq) => chatReq.messages.map((m) => m.content).join(" "),
    (text) => count(text, "words", {})
  );
