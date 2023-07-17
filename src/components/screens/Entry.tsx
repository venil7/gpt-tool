import { useContext } from "react";
import { StoreContext } from "../App";
import { Entry } from "../entry/Entry";

export const EntryScreen: React.FC = () => {
  const { entry } = useContext(StoreContext);

  return (
    <Entry
      entry={entry.data.value}
      fetching={entry.fetching.value}
      error={entry.error.value}
      onSubmit={entry.submit}
    />
  );
};
