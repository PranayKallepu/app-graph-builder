import type { Edge, Node } from "@xyflow/react";

export type ServiceStatus = "Healthy" | "Degraded" | "Down";

export interface AppSummary {
  id: string;
  name: string;
}

export interface ServiceNodeData extends Record<string, unknown> {
  label: string;
  description: string;
  status: ServiceStatus;
  metric: number;
}

export type ServiceNode = Node<ServiceNodeData, "service">;
export type ServiceEdge = Edge;

export interface AppGraph {
  nodes: ServiceNode[];
  edges: ServiceEdge[];
}

export type InspectorTab = "config" | "runtime";
