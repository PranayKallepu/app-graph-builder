import type { AppGraph, AppSummary } from "@/types/graph";

const readJson = async <T>(path: string): Promise<T> => {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Request failed with ${response.status}`);
  }

  return (await response.json()) as T;
};

export const getApps = (): Promise<AppSummary[]> => readJson<AppSummary[]>("/api/apps");

export const getGraph = (appId: string): Promise<AppGraph> =>
  readJson<AppGraph>(`/api/apps/${appId}/graph`);
