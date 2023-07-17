import { chain } from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/function";
import {
  ChatRequestDecoder,
  ChatResponseDecoder,
} from "../../decoders/openapi/chat";
import { taskEitherDecoder } from "../../decoders/util";
import { Action } from "../../domain/action";
import { ChatRequest, ChatResponse } from "../../domain/openapi/chat";
import { createPost, jsonInit } from "../fetch";

const openAIAuthInit: RequestInit = {
  ...jsonInit,
  headers: [
    ...(jsonInit.headers as [string, string][]),
    ["Authorization", `Bearer ${import.meta.env.VITE_OPENAPI_KEY as string}`],
  ],
};

const post = createPost(openAIAuthInit);

export const createChatCompletion = (
  req: ChatRequest
): Action<ChatResponse> => {
  return pipe(
    post(
      `https://api.openai.com/v1/chat/completions`,
      ChatRequestDecoder.encode(req)
    ),
    chain(taskEitherDecoder(ChatResponseDecoder))
  );
};
