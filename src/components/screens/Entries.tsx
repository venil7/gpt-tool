import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StoreContext } from "../App";
import { Entry } from "../entry/Entry";

export const EntriesScreen: React.FC = () => {
  const { entry } = useContext(StoreContext);
  const { id } = useParams();

  useEffect(() => {
    entry.get(id!);
  }, [entry, id]);

  return (
    <Entry
      onSubmit={entry.submit}
      entry={entry.data.value}
      error={entry.error.value}
      fetching={entry.fetching.value}
    />
  );
};
