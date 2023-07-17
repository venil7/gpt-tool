import { NextFunction, Request, Response } from "express";
import { ReaderTaskEither, fold } from "fp-ts/lib/ReaderTaskEither";
import { Task, fromIO } from "fp-ts/lib/Task";
import { pipe } from "fp-ts/lib/function";
import { Nullable } from "vite-node";
import { AppError } from "../domain/error";
export type ExpressHandler = (
  req: Request,
  res: Response,
  next?: NextFunction
) => unknown;

export type HandlerParams = [Request, Response, Nullable<NextFunction>];
export type HandlerAction<T> = ReaderTaskEither<HandlerParams, AppError, T>;

export type ErrorHandler = (
  e: AppError
) => (params: HandlerParams) => Task<void>;

export type SuccessHandler<T> = (
  data: T
) => (params: HandlerParams) => Task<void>;

const onError: ErrorHandler =
  (e: AppError) =>
  ([, res]) =>
    fromIO(() => {
      res.status(500).send(e);
    });

const onSuccess =
  <T>(data: T) =>
  ([, res]: [Request, Response, Nullable<NextFunction>]) =>
    fromIO(() => {
      res.status(200).json(data);
    });

export const expressify = <T>(handler: HandlerAction<T>): ExpressHandler => {
  return async (req, res, next) => {
    const task = pipe(handler, fold(onError, onSuccess));
    await task([req, res, next])();
  };
};
