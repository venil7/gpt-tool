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
import { LogEntry, logEntry as createLogEntry } from "../../domain/log_entry";
import { ChatResponse, fromSimpleRequest } from "../../domain/openapi/chat";
import {
  createJsonServerLogEntry,
  getJsonServerLogEntries,
  getJsonServerLogEntry,
} from "../../services/log_entry";
import { createChatCompletion } from "../../services/openai/chat";
import { HandlerAction, HandlerParams, expressify } from "../util";

const chatCompletion = (): HandlerAction<LogEntry> => {
  return pipe(
    asks<HandlerParams, unknown, AppError>(([req]) => req.body as unknown),
    chain(readerTaskEitherDecoder(SimpleRequestDecoder)),
    bindTo("request"),
    bind("response", ({ request }) =>
      pipe(
        request,
        fromSimpleRequest,
        createChatCompletion,
        fromTaskEither<AppError, ChatResponse, HandlerParams>
      )
    ),
    map(({ request, response }) => createLogEntry(request, response)),
    chain(
      flow(
        createJsonServerLogEntry,
        fromTaskEither<AppError, LogEntry, HandlerParams>
      )
    )
  );
};
export const chatCompletionHandler = expressify(chatCompletion());

const logEntries = (): HandlerAction<LogEntry[]> => {
  return pipe(
    getJsonServerLogEntries(),
    fromTaskEither<AppError, LogEntry[], HandlerParams>
  );
};
export const logEntriesHandler = expressify(logEntries());

const logEntry = (): HandlerAction<LogEntry> => {
  return pipe(
    asks<HandlerParams, string, AppError>(([req]) => req.params.id),
    chain(
      flow(
        getJsonServerLogEntry,
        fromTaskEither<AppError, LogEntry, HandlerParams>
      )
    )
  );
};
export const logEntryHandler = expressify(logEntry());
