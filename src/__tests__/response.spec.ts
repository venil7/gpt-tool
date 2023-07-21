import { isRight } from "fp-ts/lib/Either";
import { describe, expect, test } from "vitest";
import { ChatResponseDecoder } from "../decoders/openapi/chat";

export const response1: unknown = {
  id: "chatcmpl",
  object: "chat.completion",
  created: 1689461351,
  model: "gpt-3.5-turbo-16k-0613",
  choices: [
    {
      index: 0,
      message: {
        role: "assistant",
        content: "some text",
      },
      finish_reason: "stop",
    },
  ],
  usage: {
    prompt_tokens: 73,
    completion_tokens: 373,
    total_tokens: 446,
  },
};

const response2 = {
  ...(response1 as object),
  created: "2021-06-13T14:51:31.000Z",
};

describe("Response decoder", () => {
  test("decodes successfully with unix date", () => {
    const res = ChatResponseDecoder.decode(response1);
    expect(isRight(res)).toBe(true);
  });
  test("decodes successfully with ISO date", () => {
    const res = ChatResponseDecoder.decode(response2);
    expect(isRight(res)).toBe(true);
  });
});
