import type { AppGraph, AppSummary, ServiceNode } from "@/types/graph";

export const apps: AppSummary[] = [
  { id: "1", name: "supertokens-golang" },
  { id: "2", name: "supertokens-java" },
  { id: "3", name: "supertokens-python" }
];

const makeServiceNode = (
  id: string,
  label: string,
  description: string,
  status: ServiceNode["data"]["status"],
  metric: number,
  position: ServiceNode["position"]
): ServiceNode => ({
  id,
  type: "service",
  position,
  data: {
    label,
    description,
    status,
    metric
  }
});

export const graphs: Record<string, AppGraph> = {
  "1": {
    nodes: [
      makeServiceNode("postgres", "Postgres", "Primary relational store", "Healthy", 82, {
        x: 40,
        y: 80
      }),
      makeServiceNode("redis", "Redis", "Session and token cache", "Degraded", 57, {
        x: 360,
        y: 30
      }),
      makeServiceNode("mongodb", "MongoDB", "Audit event archive", "Healthy", 74, {
        x: 360,
        y: 230
      })
    ],
    edges: [
      { id: "postgres-redis", source: "postgres", target: "redis", animated: true },
      { id: "postgres-mongodb", source: "postgres", target: "mongodb" }
    ]
  },
  "2": {
    nodes: [
      makeServiceNode("gateway", "Gateway", "Java edge gateway", "Healthy", 91, {
        x: 60,
        y: 140
      }),
      makeServiceNode("postgres", "Postgres", "Shared app database", "Down", 12, {
        x: 370,
        y: 60
      }),
      makeServiceNode("redis", "Redis", "Policy cache", "Healthy", 66, {
        x: 370,
        y: 260
      })
    ],
    edges: [
      { id: "gateway-postgres", source: "gateway", target: "postgres" },
      { id: "gateway-redis", source: "gateway", target: "redis", animated: true }
    ]
  },
  "3": {
    nodes: [
      makeServiceNode("worker", "Worker", "Python async processor", "Healthy", 78, {
        x: 70,
        y: 70
      }),
      makeServiceNode("mongo", "MongoDB", "Document event store", "Degraded", 44, {
        x: 390,
        y: 70
      }),
      makeServiceNode("queue", "Redis", "Background queue", "Healthy", 69, {
        x: 230,
        y: 260
      })
    ],
    edges: [
      { id: "worker-mongo", source: "worker", target: "mongo" },
      { id: "worker-queue", source: "worker", target: "queue", animated: true }
    ]
  }
};
