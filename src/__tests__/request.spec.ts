import { isRight } from "fp-ts/lib/Either";
import { describe, expect, test } from "vitest";
import { SimpleRequestDecoder } from "../decoders/openapi/chat";

export const request1: unknown = {
  model: "gpt-3.5-turbo-16k",
  system: "some text",
  user: "some text",
};

describe("Request decoder", () => {
  test("decodes successfully", () => {
    const res = SimpleRequestDecoder.decode(request1);
    expect(isRight(res)).toBe(true);
  });
});
