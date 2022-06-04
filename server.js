import express from "express";
import { createRequestHandler } from "@remix-run/express";
import { watch } from "remix-webpack-cli/lib/compiler-commands.mjs";

let mode =
  process.env.NODE_ENV === "development" ? "development" : "production";

if (mode === "development") {
  await watch();
}

let app = express();
app.use(express.static("public"));

let requestHandler;
app.all("*", async (req, res, next) => {
  try {
    if (!requestHandler || process.env.NODE_ENV === "development") {
      let build = await import(`./build/index.js?ts=${Date.now()}`);
      requestHandler = createRequestHandler({
        build,
        mode,
      });
    }

    await requestHandler(req, res, next);
  } catch (error) {
    next(error);
  }
});

let port = Number(process.env.PORT || 3000);

app.listen(port, () => {
  console.log(`App started at http://localhost:${port}`);
});
