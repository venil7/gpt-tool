import { format } from "date-fns";
import { pipe } from "fp-ts/lib/function";
import ReactMarkdown from "react-markdown";
import {
  Badge,
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  TabPane,
} from "reactstrap";
import remarkGfm from "remark-gfm";
import { ChatResponse } from "../../domain/openapi/chat";
import { withNoData } from "../../enhancers";
import { Tabs } from "../utils/Tabs";
import { TextArea } from "../utils/TextArea";

export type ResponsePreviewProps = {
  response: ChatResponse;
  disabled?: boolean;
};

const RawResponsePreview: React.FC<ResponsePreviewProps> = ({ response }) => {
  return (
    <Row>
      <Col>
        <Badge>{format(response.created, "yyyy-MM-dd HH:mm:ss")}</Badge>
        {response.choices.map(({ index, message }) => (
          <Card key={index}>
            <CardTitle>{message.role}</CardTitle>
            <CardBody>
              <Tabs tabs={["Preview", "Raw"]}>
                <TabPane tabId={0}>
                  <ReactMarkdown
                    children={message.content}
                    remarkPlugins={[remarkGfm]}
                  />
                </TabPane>
                <TabPane tabId={1}>
                  <TextArea rows={20} value={message.content} readonly />
                </TabPane>
              </Tabs>
            </CardBody>
          </Card>
        ))}
      </Col>
    </Row>
  );
};

export const Response = pipe(
  RawResponsePreview,
  withNoData((p) => p.response)
);
