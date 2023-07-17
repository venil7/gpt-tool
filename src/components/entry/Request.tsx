import { Col, FormGroup, Label, Row } from "reactstrap";
import { SimpleRequest } from "../../domain/openapi/chat";
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
