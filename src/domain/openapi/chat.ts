import * as t from "io-ts";
import {
  ChatRequestDecoder,
  ChatResponseDecoder,
  SimpleRequestDecoder,
} from "../../decoders/openapi/chat";

export enum ChatCompletionsModel {
  GPT4 = "gpt-4",
  GPT4_0613 = "gpt-4-0613",
  GPT4_32K = "gpt-4-32k",
  GPT4_32K_0613 = "gpt-4-32k-0613",
  GPT35_TURBO = "gpt-3.5-turbo",
  GPT35_TURBO_0613 = "gpt-3.5-turbo-0613",
  GPT35_TURBO_16K = "gpt-3.5-turbo-16k",
  GPT35_TURBO_16K_0613 = "gpt-3.5-turbo-16k-0613",
}
export enum ChatRole {
  User = "user",
  System = "system",
  Assistant = "assistant",
  Function = "function",
}

export type ChatRequest = t.TypeOf<typeof ChatRequestDecoder>;
export type ChatResponse = t.TypeOf<typeof ChatResponseDecoder>;

export type SimpleRequest = t.TypeOf<typeof SimpleRequestDecoder>;

export const fromSimpleRequest = ({
  system,
  user,
}: SimpleRequest): ChatRequest => ({
  model: ChatCompletionsModel.GPT35_TURBO_16K,
  messages: [
    {
      role: ChatRole.System,
      content: system,
    },
    {
      role: ChatRole.User,
      content: user,
    },
  ],
});
