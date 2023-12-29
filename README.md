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