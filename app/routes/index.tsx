import * as React from "react";
import { deferred } from "@remix-run/server-runtime";
import { Deferred, useLoaderData } from "@remix-run/react";

import * as os from "os";

import Counter from "~/components/counter";

export let loader = () => {
  return deferred({
    message: new Promise((resolve) =>
      setTimeout(() => resolve(`Hello, ${os.platform()}`), 1000)
    ),
  });
};

export default function Index() {
  let { message } = useLoaderData();
  return (
    <main>
      <Counter />
      <Deferred value={message}>{(message) => <h1>{message}</h1>}</Deferred>
      <p>More</p>
    </main>
  );
}
