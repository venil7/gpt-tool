import { Signal, signal } from "@preact/signals-react";
import { chain, chainFirstIOK, fromIO, orElseW } from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/function";
import { Nullable } from "vite-node";
import { Action } from "../domain/action";
import { AppError } from "../domain/error";

export type StoreBase<T> = {
  error: Signal<Nullable<AppError>>;
  fetching: Signal<boolean>;
  data: Signal<T>;

  update: (action: Action<T>) => Promise<unknown>;
};

export const createStoreBase = <T>(data: Signal<T>): StoreBase<T> => {
  const error = signal<Nullable<AppError>>(null);
  const fetching = signal<boolean>(false);

  const update = async (action: Action<T>): Promise<unknown> => {
    return pipe(
      fromIO(() => {
        fetching.value = true;
        error.value = null;
      }),
      chain(() => action),
      chainFirstIOK((d) => () => {
        fetching.value = false;
        data.value = d;
      }),
      orElseW((err) =>
        fromIO(() => {
          fetching.value = false;
          error.value = err;
        })
      )
    )();
  };

  return {
    error,
    fetching,
    data,
    update,
  };
};
