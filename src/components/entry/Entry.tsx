import { pipe } from "fp-ts/lib/function";
import { useState } from "react";
import {
  Button,
  Col,
  Row,
  TabPaneProps,
  TabPane as TabPaneRaw,
} from "reactstrap";
import { LogEntry } from "../../domain/log_entry";
import { withError, withFetching, withVisibility } from "../../enhancers";
import { Tabs } from "../utils/Tabs";
import { Request } from "./Request";
import { RequestPreview } from "./RequestPreview";
import { Response } from "./Response";

export type EntryProps = {
  entry: LogEntry;
  onSubmit: (entry: LogEntry) => unknown;
  disabled?: boolean;
};

const TabPane = pipe(
  TabPaneRaw as unknown as React.FC<TabPaneProps>,
  withVisibility
);

const RawEntry: React.FC<EntryProps> = ({ entry, onSubmit, disabled }) => {
  const [request, setRequest] = useState(entry.request);
  const handleClick = () => onSubmit({ ...entry, request });

  return (
    <>
      <Tabs tabs={["Raw Request", "Preview Request", "Response"]}>
        <TabPane tabId={0}>
          <Request
            request={request}
            onChange={setRequest}
            disabled={disabled}
          />
        </TabPane>
        <TabPane tabId={1}>
          <RequestPreview request={request} />
        </TabPane>
        <TabPane tabId={2} hidden={!entry.response}>
          <Response response={entry.response} disabled={disabled} />
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
