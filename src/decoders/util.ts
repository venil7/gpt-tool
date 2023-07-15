import { fromTaskEither } from "fp-ts/lib/ReaderTaskEither";
import { fromEither, mapLeft } from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/function";
import * as t from "io-ts";
import { AppError, genericError } from "../domain/error";

export const taskEitherDecoder = <T, U = unknown>(decoder: t.Decoder<U, T>) => {
  return (data: U) =>
    pipe(
      data,
      decoder.decode,
      fromEither,
      mapLeft((decoderErrors) => genericError(JSON.stringify(decoderErrors)))
    );
};

export const readerTaskEitherDecoder = <T, R, U = unknown>(
  decoder: t.Decoder<U, T>
) => {
  return (data: U) =>
    pipe(data, taskEitherDecoder(decoder), fromTaskEither<AppError, T, R>);
};
