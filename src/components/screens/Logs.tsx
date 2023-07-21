import { useContext, useEffect } from "react";
import { StoreContext } from "../App";
import { Logs } from "../logs/Logs";

export const LogsScreen: React.FC = () => {
  const { logs } = useContext(StoreContext);

  useEffect(() => {
    logs.get(10);
  }, [logs]);

  return (
    <Logs
      logs={logs.data.value}
      error={logs.error.value}
      fetching={logs.fetching.value}
    />
  );
};
