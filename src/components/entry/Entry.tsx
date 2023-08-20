import { pipe } from "fp-ts/lib/function";
import { useState } from "react";
import { Button, Col, Row } from "reactstrap";
import { LogEntry } from "../../domain/log_entry";
import { withError, withFetching } from "../../enhancers";
import { TabPane, Tabs } from "../utils/Tabs";
import { Diff } from "./Diff";
import { Request } from "./Request";
import { Response } from "./ResponsePreview";

export type EntryProps = {
  entry: LogEntry;
  onSubmit: (entry: LogEntry) => unknown;
  disabled?: boolean;
};

const RawEntry: React.FC<EntryProps> = ({ entry, onSubmit, disabled }) => {
  const [request, setRequest] = useState(entry.request);
  const handleClick = () => onSubmit({ ...entry, request });

  return (
    <>
      <Tabs tabs={["Request", "Response", "Diff"]}>
        <TabPane tabId={0}>
          <Request
            request={request}
            onChange={setRequest}
            disabled={disabled}
          />
        </TabPane>
        <TabPane tabId={1} hidden={!entry.response}>
          <Response response={entry.response} disabled={disabled} />
        </TabPane>
        <TabPane tabId={2} hidden={!entry.response}>
          <Diff entry={entry} />
        </TabPane>
      </Tabs>

      <hr />
      <Row>
        <Col>
          <Button
            size="lg"
            color="primary"
            disabled={disabled}
            onClick={handleClick}
          >
            Submit
          </Button>
        </Col>
      </Row>
    </>
  );
};

export const Entry = pipe(RawEntry, withError, withFetching);
