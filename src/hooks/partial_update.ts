import { useState } from "react";

export const usePartialState = <T extends Record<string, unknown>>(obj: T) => {
  const [model, setModel] = useState(obj);
  const setPartialModel =
    <K extends keyof T>(key: K) =>
    (val: T[K]) =>
      setModel({ ...model, [key]: val });
  return [model, setPartialModel] as const;
};
