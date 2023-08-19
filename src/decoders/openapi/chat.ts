import { map } from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/function";
import * as t from "io-ts";
import { ChatCompletionsModel, ChatRole } from "../../domain/chat";
import { dateDecoder } from "../util";

const ChatModelDecoder = pipe(
  Object.values(ChatCompletionsModel),
  map((v) => t.literal(v) as t.Mixed),
  (codecs) =>
    t.union(codecs as unknown as [t.Mixed, t.Mixed, ...t.Mixed[]]) as t.Type<
      ChatCompletionsModel,
      string
    >
);

const ChatRoleDecoder = pipe(
  Object.values(ChatRole),
  map((v) => t.literal(v) as t.Mixed),
  (codecs) =>
    t.union(codecs as unknown as [t.Mixed, t.Mixed, ...t.Mixed[]]) as t.Type<
      ChatRole,
      string
    >
);

export const ChatMessageDecoder = t.type({
  role: ChatRoleDecoder,
  content: t.string,
});

export const ChatRequestDecoder = t.type({
  model: ChatModelDecoder,
  messages: t.array(ChatMessageDecoder),
});

export const SimpleRequestDecoder = t.type({
  model: ChatModelDecoder,
  system: t.string,
  user: t.string,
});

export const ChatResponseDecoder = t.type({
  id: t.string,
  object: t.string,
  created: dateDecoder(),
  model: ChatModelDecoder,
  choices: t.array(
    t.type({
      index: t.number,
      message: t.type({
        role: ChatRoleDecoder,
        content: t.string,
      }),
      finish_reason: t.string,
    })
  ),
  usage: t.type({
    prompt_tokens: t.number,
    completion_tokens: t.number,
    total_tokens: t.number,
  }),
});
