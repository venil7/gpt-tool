import { format } from "date-fns";
import { pipe } from "fp-ts/lib/function";
import ReactMarkdown from "react-markdown";
import { Card, CardBody, CardTitle, Col, Row, TabPane } from "reactstrap";
import remarkGfm from "remark-gfm";
import {
  ALL_MODELS,
  ChatCompletionsModel,
  ChatResponse,
} from "../../domain/chat";
import { withNoData } from "../../enhancers";
import { Select } from "../utils/Select";
import { Tabs } from "../utils/Tabs";
import { TextArea } from "../utils/TextArea";

export type ResponsePreviewProps = {
  response: ChatResponse;
  disabled?: boolean;
};

const RawResponsePreview: React.FC<ResponsePreviewProps> = ({ response }) => {
  return (
    <>
      <Row>
        <Col xs={4}>
          <Select<ChatCompletionsModel>
            options={ALL_MODELS}
            selected={response.model}
            disabled
          />
        </Col>
        <Col xs={4}>
          <span>{format(response.created, "yyyy-MM-dd HH:mm:ss")}</span>
        </Col>
        <Col xs={4}>
          <span>prompt tokens: {response.usage.prompt_tokens}</span> &nbsp;
          <span>completion tokens: {response.usage.completion_tokens}</span>
        </Col>
      </Row>
      {response.choices.map(({ index, message }) => (
        <Card key={index}>
          <CardTitle>
            <h6>role: {message.role}</h6>
          </CardTitle>
          <CardBody>
            <Tabs tabs={["Preview", "Raw"]}>
              <TabPane tabId={0}>
                <ReactMarkdown
                  children={message.content}
                  remarkPlugins={[remarkGfm]}
                />
              </TabPane>
              <TabPane tabId={1}>
                <TextArea rows={20} value={message.content} readOnly />
              </TabPane>
            </Tabs>
          </CardBody>
        </Card>
      ))}
    </>
  );
};

export const Response = pipe(
  RawResponsePreview,
  withNoData((p) => p.response)
);
