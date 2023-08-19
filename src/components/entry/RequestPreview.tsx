import ReactMarkdown from "react-markdown";
import { Col, Row } from "reactstrap";
import remarkGfm from "remark-gfm";
import { SimpleRequest } from "../../domain/simple_request";

export type RequestPreviewProps = {
  request: SimpleRequest;
  disabled?: boolean;
};

export const RequestPreview: React.FC<RequestPreviewProps> = ({ request }) => {
  return (
    <Row>
      <Col sm="12">
        <h6>System</h6>
        <ReactMarkdown children={request.system} remarkPlugins={[remarkGfm]} />
      </Col>
      <Col sm="12">
        <h6>User</h6>
        <ReactMarkdown children={request.user} remarkPlugins={[remarkGfm]} />
      </Col>
    </Row>
  );
};
