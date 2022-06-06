import express from "express";
import { createRequestHandler } from "@remix-run/express";

import * as build from "./build/index.js";

let mode =
  process.env.NODE_ENV === "development" ? "development" : "production";

let requestHandler = createRequestHandler({
  build,
  mode,
});

let app = express();
app.use(express.static("public"));

app.all("*", requestHandler);

let port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);
});
