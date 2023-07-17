import { pipe } from "fp-ts/lib/function";
import { FormEvent, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { Col, FormGroup, Input, Label, Row, TabPane } from "reactstrap";
import remarkGfm from "remark-gfm";
import { LogEntry } from "../../domain/log_entry";
import { withError, withFetching } from "../../enhancers";
import { usePartialState } from "../../hooks/partial_update";
import { Tabs } from "../utils/Tabs";

export type EntryProps = {
  entry: LogEntry;
  onSubmit: (entry: LogEntry) => unknown;
};

const RawEntry: React.FC<EntryProps> = ({ entry }) => {
  const [request, setRequest] = usePartialState(entry.request);

  const handleSystemChange = useCallback(
    ({ currentTarget }: FormEvent<HTMLInputElement>) =>
      pipe(currentTarget.value, setRequest("system")),
    [setRequest]
  );

  const handleUserChange = useCallback(
    ({ currentTarget }: FormEvent<HTMLInputElement>) =>
      pipe(currentTarget.value, setRequest("user")),
    [setRequest]
  );

  return (
    <Tabs tabs={["Raw Markdown", "Preview"]}>
      <TabPane tabId={0}>
        <Row>
          <Col sm="12">
            <FormGroup>
              <Label for="system">System</Label>
              <Input
                rows={4}
                id="system"
                name="system"
                type="textarea"
                value={request.system}
                onInput={handleSystemChange}
              />
            </FormGroup>
          </Col>
          <Col sm="12">
            <FormGroup>
              <Label for="user">User</Label>
              <Input
                rows={10}
                id="user"
                name="user"
                type="textarea"
                value={request.user}
                onInput={handleUserChange}
              />
            </FormGroup>
          </Col>
        </Row>
      </TabPane>
      <TabPane tabId={1}>
        <Row>
          <Col sm="12">
            <h3>System</h3>
            <ReactMarkdown
              children={request.system}
              remarkPlugins={[remarkGfm]}
            />
          </Col>
          <Col sm="12">
            <h3>User</h3>
            <ReactMarkdown
              children={request.user}
              remarkPlugins={[remarkGfm]}
            />
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  );
};

export const Entry = pipe(RawEntry, withError, withFetching);
