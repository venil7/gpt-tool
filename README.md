# OpenAPI Query Tool 

 Inclides access to all models:
  - GPT4 
  - GPT4_0613 
  - GPT4_32K 
  - GPT4_32K_0613 
  - GPT35_TURBO 
  - GPT35_TURBO_0613 
  - GPT35_TURBO_16K 
  - GPT35_TURBO_16K_0613 


### setup

requires the following files in root:

 - `.env`

```sh
VITE_OPENAPI_KEY=key-here....
VITE_API_PORT=4001
VITE_JSON_SERVER_PORT=5001
```

 - `db.json`

```json
{
  "log": []
}
```

## `jq` query to connvert to plain JSON

```shell
[ .log[] | {  id: .id,   date: .date,   request_model: .request.model,   request_system: .request.system,   request_user: .request.user,   response_id: .response.id,  response_object: .response.object,  response_created: .response.created,  response_model: .response.model,  response_message_role: .response.choices[0].message.role,  response_message_content: .response.choices[0].message.content,  response_message_finish_reason: .response.choices[0].finish_reason,  response_usage_prompt_tokens: .response.usage.prompt_tokens,  response_usage_completion_tokens: .response.usage.completion_tokens,  response_usage_total_tokens: .response.usage.total_tokens  } ]
```

## to convert to DuckDB

```sql
CREATE TABLE records AS
SELECT *
FROM read_json('db2.json',
               format = 'array',
               columns = {
                          id: 'UUID',
                          date: 'TIMESTAMP',  -- Adjust if needed (e.g., DATE)
                          request_model: 'VARCHAR',
                          request_system: 'VARCHAR',
                          request_user: 'VARCHAR',
                          response_id: 'VARCHAR',
                          response_object: 'VARCHAR',
                          -- response_created: 'BIGINT',
                          response_model: 'VARCHAR',
                          response_message_role: 'VARCHAR',
                          response_message_content: 'VARCHAR',
                          response_message_finish_reason: 'VARCHAR',
                          response_usage_prompt_tokens: 'INTEGER',
                          response_usage_completion_tokens: 'INTEGER',
                          response_usage_total_tokens: 'INTEGER'
                        }
              );
```