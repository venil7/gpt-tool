import bodyParser from "body-parser";
import express from "express";
import JS from "json-server";
import { chatCompletionHandler, logEntriesHandler } from "./handlers/handlers";

declare global {
  // eslint-disable-next-line
  var apiServer: { close: () => void };
  // eslint-disable-next-line
  var jsonServer: { close: () => void };
}

const API_PORT: number = Number(import.meta.env.VITE_API_PORT) ?? 4000;
const JSON_SERVER_PORT: number =
  Number(import.meta.env.VITE_JSON_SERVER_PORT) ?? 5000;

global.apiServer?.close();
global.jsonServer?.close();

const db = `./db.json`;

const jsonServer = JS.create();
const jsonRouter = JS.router(db);
const middlewares = JS.defaults();

const apiApp: express.Application = express();
const jsonApp: express.Application = express();

jsonApp.use(middlewares);
jsonApp.use("/db", jsonServer.use(jsonRouter));

apiApp.use(bodyParser.json());

apiApp.get("/chat/logs", logEntriesHandler);
apiApp.post("/chat/completion", chatCompletionHandler);

global.apiServer = apiApp.listen(API_PORT, "0.0.0.0", () =>
  console.log(`API listening: ${API_PORT}`)
);
global.jsonServer = jsonApp.listen(JSON_SERVER_PORT, "127.0.0.1", () =>
  console.log(`JSON-Server listening: ${JSON_SERVER_PORT}`)
);
