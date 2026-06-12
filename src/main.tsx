import React from "react";
import ReactDOM from "react-dom/client";

import { QueryProvider } from "@/app/providers/QueryProvider";
import App from "@/App";
import "@/index.css";

const enableMocking = async (): Promise<void> => {
  if (!import.meta.env.DEV) {
    return;
  }

  const { worker } = await import("@/mocks/browser");
  await worker.start({ onUnhandledRequest: "bypass" });
};

await enableMocking();

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element was not found");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <QueryProvider>
      <App />
    </QueryProvider>
  </React.StrictMode>
);
