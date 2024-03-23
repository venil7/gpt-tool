import { chain } from "fp-ts/lib/Task";
import { tryCatch } from "fp-ts/lib/TaskEither";
import { pipe } from "fp-ts/lib/function";
import { Nullable } from "vite-node";
import { Action } from "../domain/action";
import { AppError, genericError } from "../domain/error";

export enum HttpMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Patch = "PATCH",
  Delete = "DELETE",
}

export const jsonInit: RequestInit = {
  headers: [
    ["Accept", "application/json"],
    ["Content-Type", "application/json"],
  ],
};

export const createFetch =
  (method: HttpMethod, init: RequestInit = {}) =>
  <T extends BodyInit>(
    url: string,
    body: Nullable<T> = null
  ): Action<unknown> => {
    const fetchTask = pipe(
      () => fetch(url, { ...init, method, body }),
      chain((resp) => () => resp.json())
    );
    return tryCatch<AppError, unknown>(fetchTask, (e) =>
      genericError((e as Error)?.message ?? "unknown error")
    );
  };

export const createGet =
  (init: RequestInit = jsonInit) =>
  (url: string) =>
    createFetch(HttpMethod.Get, init)(url);

export const createPost =
  (init: RequestInit = jsonInit) =>
  <T extends {}>(url: string, body: T) =>
    createFetch(HttpMethod.Post, init)(url, JSON.stringify(body));
