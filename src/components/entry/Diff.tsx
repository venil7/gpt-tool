import ReactDiffViewer from "react-diff-viewer-continued";
import { LogEntry } from "../../domain/log_entry";

export type DiffProps = {
  entry: LogEntry;
};

export const Diff: React.FC<DiffProps> = ({ entry }) => {
  const response = entry.response?.choices[0]?.message.content ?? "";
  return (
    <ReactDiffViewer
      oldValue={entry.request.user}
      newValue={response}
      splitView={true}
    />
  );
};
