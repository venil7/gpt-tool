import { Col, FormGroup, Label, Row } from "reactstrap";
import { ALL_MODELS, ChatCompletionsModel } from "../../domain/chat";
import { SimpleRequest, numWords } from "../../domain/simple_request";
import { Select } from "../utils/Select";
import { TabPane, Tabs } from "../utils/Tabs";
import { TextArea } from "../utils/TextArea";
import { RequestPreview } from "./RequestPreview";

export type RequestProps = {
  request: SimpleRequest;
  onChange: (s: SimpleRequest) => void;
  disabled?: boolean;
};

export const Request: React.FC<RequestProps> = ({
  request,
  onChange,
  disabled,
}) => {
  const wordCount = numWords(request);
  const handleChange =
    (key: keyof SimpleRequest) => (val: SimpleRequest[typeof key]) =>
      onChange({ ...request, [key]: val });
  return (
    <Row>
      <Col sm="12">
        <FormGroup>
          <Label for="system">Model</Label>
          <Select<ChatCompletionsModel>
            options={ALL_MODELS}
            selected={request.model}
            onSelect={handleChange("model")}
            disabled={disabled}
          />
        </FormGroup>
      </Col>
      <Col sm="12">
        <FormGroup>
          <Label for="system">System</Label>
          <TextArea
            rows={2}
            id="system"
            disabled={disabled}
            value={request.system}
            onInput={handleChange("system")}
          />
        </FormGroup>
      </Col>
      <Col sm="12">
        <Tabs tabs={["Raw", "Preview"]}>
          <TabPane tabId={0}>
            <FormGroup>
              <Label for="user">User</Label>
              <TextArea
                rows={10}
                id="user"
                disabled={disabled}
                value={request.user}
                onInput={handleChange("user")}
              />
            </FormGroup>
            Word count: {wordCount}
          </TabPane>
          <TabPane tabId={1}>
            <RequestPreview request={request} />
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};
