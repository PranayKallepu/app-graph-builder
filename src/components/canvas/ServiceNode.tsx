import { Activity } from "lucide-react";
import { Handle, Position, type NodeProps } from "@xyflow/react";

import { StatusBadge } from "@/components/inspector/StatusBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { ServiceNode as ServiceNodeType } from "@/types/graph";

export const ServiceNode = ({ data, selected }: NodeProps<ServiceNodeType>) => (
  <Card
    className={cn(
      "w-56 overflow-hidden border-border bg-card/95 shadow-glow transition-colors",
      selected && "border-primary"
    )}
  >
    <Handle
      className="!size-2 !border-border !bg-primary"
      position={Position.Left}
      type="target"
    />
    <CardHeader className="space-y-2 pb-3">
      <div className="flex items-start justify-between gap-3">
        <CardTitle className="truncate text-sm">{data.label}</CardTitle>
        <StatusBadge status={data.status} />
      </div>
      <p className="line-clamp-2 text-xs text-muted-foreground">{data.description}</p>
    </CardHeader>
    <CardContent className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Activity className="size-3.5" />
          Runtime
        </span>
        <span className="font-semibold">{data.metric}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-primary" style={{ width: `${data.metric}%` }} />
      </div>
    </CardContent>
    <Handle
      className="!size-2 !border-border !bg-primary"
      position={Position.Right}
      type="source"
    />
  </Card>
);
