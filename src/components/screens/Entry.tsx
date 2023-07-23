import { useContext, useEffect } from "react";
import { StoreContext } from "../App";
import { Entry } from "../entry/Entry";

export const EntryScreen: React.FC = () => {
  const { entry } = useContext(StoreContext);

  useEffect(() => {
    entry.new();
  }, [entry]);

  return (
    <Entry
      onSubmit={entry.submit}
      entry={entry.data.value}
      error={entry.error.value}
      fetching={entry.fetching.value}
    />
  );
};
