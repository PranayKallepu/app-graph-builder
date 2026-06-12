import { useQuery } from "@tanstack/react-query";

import { getGraph } from "@/services/api";

export const useGraph = (appId: string) =>
  useQuery({
    queryKey: ["apps", appId, "graph"],
    queryFn: () => getGraph(appId),
    staleTime: 1000 * 60
  });
