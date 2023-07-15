import { chain, of } from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/function";
import {
  ChatRequestDecoder,
  ChatResponseDecoder,
} from "../../decoders/openapi/chat";
import { taskEitherDecoder } from "../../decoders/util";
import { Action } from "../../domain/action";
import { AppError } from "../../domain/error";
import { ChatRequest, ChatResponse, ChatRole } from "../../domain/openapi/chat";
import { createPost } from "../fetch";

const openAIAuthInit: RequestInit = {
  headers: [
    ["Authorization", `Bearer ${import.meta.env.VITE_OPENAPI_KEY}`],
    ["Accept", "application/json"],
    ["Content-Type", "application/json"],
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

export const createChatCompletion2 = (
  _req: ChatRequest
): Action<ChatResponse> => {
  return of<AppError, ChatResponse>({
    id: "",
    object: "",
    created: new Date(),
    choices: [
      {
        index: 1,
        message: {
          role: ChatRole.Assistant,
          content: "some cont",
        },
        finish_reason: "stop",
      },
    ],
    usage: {
      completion_tokens: 1,
      prompt_tokens: 1,
      total_tokens: 1,
    },
  });
};
