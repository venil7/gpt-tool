import { Either } from "fp-ts/lib/Either";
import { TaskEither } from "fp-ts/lib/TaskEither";
import { AppError } from "./error";

export type Action<T> = TaskEither<AppError, T>;
export type Result<T> = Either<AppError, T>;
export type Identity<T> = { [P in keyof T]: T[P] };
