import { delay, http, HttpResponse } from "msw";

import { apps, graphs } from "@/mocks/data";

const randomLatency = () => 800 + Math.floor(Math.random() * 401);

export const handlers = [
  http.get("/api/apps", async () => {
    await delay(randomLatency());
    return HttpResponse.json(apps);
  }),
  http.get("/api/apps/:appId/graph", async ({ params }) => {
    await delay(randomLatency());
    const appId = String(params.appId);
    const graph = graphs[appId];

    if (!graph) {
      return HttpResponse.json({ message: "Graph not found" }, { status: 404 });
    }

    return HttpResponse.json(graph);
  })
];
