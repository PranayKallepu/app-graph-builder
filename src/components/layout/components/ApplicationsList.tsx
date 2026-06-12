import { Box, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useApps } from "@/hooks/useApps";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store/useAppStore";
import { useGraphStore } from "@/store/useGraphStore";

export const ApplicationsList = () => {
  const selectedAppId = useAppStore((state) => state.selectedAppId);
  const setSelectedAppId = useAppStore((state) => state.setSelectedAppId);
  const setSelectedNodeId = useGraphStore((state) => state.setSelectedNodeId);
  const { data, error, isLoading, refetch } = useApps();

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-3 rounded-lg border border-border p-3">
        <p className="text-sm text-muted-foreground">Applications failed to load.</p>
        <Button size="sm" variant="outline" onClick={() => void refetch()}>
          <RefreshCcw className="size-3.5" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {data?.map((app) => {
        const active = app.id === selectedAppId;

        return (
          <button
            className={cn(
              "flex h-10 w-full items-center gap-2 rounded-md border px-3 text-left text-sm transition-colors",
              active
                ? "border-primary/50 bg-primary/10 text-foreground"
                : "border-border bg-transparent text-muted-foreground hover:bg-secondary hover:text-foreground"
            )}
            key={app.id}
            type="button"
            onClick={() => {
              setSelectedAppId(app.id);
              setSelectedNodeId(null);
            }}
          >
            <Box className="size-4 shrink-0" />
            <span className="min-w-0 truncate">{app.name}</span>
          </button>
        );
      })}
    </div>
  );
};
