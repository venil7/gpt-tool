export enum AppErrorType {
  General = "general",
  Http = "http",
  Auth = "auth",
}
export type AppError = {
  type: AppErrorType;
  message?: string;
};

export const genericError = (message: string): AppError => ({
  type: AppErrorType.General,
  message,
});
