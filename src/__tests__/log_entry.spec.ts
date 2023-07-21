import { isRight } from "fp-ts/lib/Either";
import { describe, expect, test } from "vitest";
import { LogEntryDecoder } from "../decoders/log_entry";
import { request1 } from "./request.spec";
import { response1 } from "./response.spec";

const logEntry1: unknown = {
  request: request1,
  response: response1,
};

const logEntry2: unknown = {
  ...(logEntry1 as object),
  id: "f019ccb9-6107-415c-9e29-12c95d54919a",
  date: "2021-01-01T00:00:00.000Z",
};

describe("Request decoder", () => {
  test("decodes successfully", () => {
    const res = LogEntryDecoder.decode(logEntry1);
    expect(isRight(res)).toBe(true);
  });
  test("decodes successfully, includes UUID and ISO date", () => {
    const res = LogEntryDecoder.decode(logEntry2);
    expect(isRight(res)).toBe(true);
  });
});
