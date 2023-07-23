import { Col, FormGroup, Label, Row } from "reactstrap";
import {
  ALL_MODELS,
  ChatCompletionsModel,
  SimpleRequest,
} from "../../domain/openapi/chat";
import { Select } from "../utils/Select";
import { TextArea } from "../utils/TextArea";

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
      </Col>
    </Row>
  );
};
