import * as React from "react";
import { hydrate } from "react-dom";
import { RemixBrowser } from "@remix-run/react";

const documentElement = document.documentElement;
const apply = (n) => document.replaceChild(n, documentElement);
hydrate(<RemixBrowser />, {
  childNodes: [documentElement],
  firstChild: documentElement,
  insertBefore: apply,
  appendChild: apply,
});
