import { useContext } from "react";
import { StoreContext } from "../App";

export const LogsScreen: React.FC = () => {
  const { entry } = useContext(StoreContext);

  // const { id = 1 } = useParams();
  // useEffect(() => {
  // film.load(+id);
  // }, [film, id]);

  return <>logs</>;
};
