import { useContext } from "react";
import { StoreContext } from "../App";
import { Entry } from "../entry/Entry";

export const EntryScreen: React.FC = () => {
  const { entry } = useContext(StoreContext);

  // const { id = 1 } = useParams();
  // useEffect(() => {
  // film.load(+id);
  // }, [film, id]);

  return <Entry entry={entry.data.value} onSubmit={console.log} />;
};
