import {
  asks,
  bind,
  bindTo,
  chain,
  fromTaskEither,
  map,
} from "fp-ts/lib/ReaderTaskEither";
import { flow, pipe } from "fp-ts/lib/function";
import { SimpleRequestDecoder } from "../../decoders/openapi/chat";
import { readerTaskEitherDecoder } from "../../decoders/util";
import { AppError } from "../../domain/error";
import { LogEntry, logEntry } from "../../domain/log_entry";
import { ChatResponse, fromSimpleRequest } from "../../domain/openapi/chat";
import { createLogEntry } from "../../services/log_entry";
import { createChatCompletion } from "../../services/openai/chat";
import { HandlerAction, HandlerParams, expressify } from "../util";

const chatCompletion = (): HandlerAction<LogEntry> => {
  return pipe(
    asks<HandlerParams, string, AppError>(([req]) => req.body),
    chain(readerTaskEitherDecoder(SimpleRequestDecoder)),
    map(fromSimpleRequest),
    bindTo("request"),
    bind("response", ({ request }) =>
      pipe(
        request,
        // createChatCompletion2,
        createChatCompletion,
        fromTaskEither<AppError, ChatResponse, HandlerParams>
      )
    ),
    map(({ request, response }) => logEntry(request, response)),
    chain(
      flow(createLogEntry, fromTaskEither<AppError, LogEntry, HandlerParams>)
    )
  );
};
export const chatCompletionHandler = expressify(chatCompletion());
