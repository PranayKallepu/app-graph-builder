import type { OnEdgesChange, OnNodesChange } from "@xyflow/react";

import { GraphCanvas } from "@/components/canvas/GraphCanvas";
import { LeftRail } from "@/components/layout/layout/LeftRail";
import { MobilePanel } from "@/components/layout/layout/MobilePanel";
import { RightPanel } from "@/components/layout/layout/RightPanel";
import { TopBar } from "@/components/layout/layout/TopBar";
import type { ServiceEdge, ServiceNode, ServiceNodeData } from "@/types/graph";

interface AppLayoutProps {
  nodes: ServiceNode[];
  edges: ServiceEdge[];
  selectedNode: ServiceNode | null;
  graphLoading: boolean;
  graphError: Error | null;
  onNodesChange: OnNodesChange<ServiceNode>;
  onEdgesChange: OnEdgesChange<ServiceEdge>;
  onNodeDataChange: (nodeId: string, updates: Partial<ServiceNodeData>) => void;
  onGraphRetry: () => void;
}

export const AppLayout = ({
  edges,
  graphError,
  graphLoading,
  nodes,
  onEdgesChange,
  onGraphRetry,
  onNodeDataChange,
  onNodesChange,
  selectedNode
}: AppLayoutProps) => (
  <div className="flex h-full min-h-0 flex-col bg-background">
    <TopBar />
    <div className="flex min-h-0 flex-1">
      <LeftRail />
      <GraphCanvas
        edges={edges}
        error={graphError}
        loading={graphLoading}
        nodes={nodes}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        onRetry={onGraphRetry}
      />
      <RightPanel selectedNode={selectedNode} onNodeDataChange={onNodeDataChange} />
    </div>
    <MobilePanel selectedNode={selectedNode} onNodeDataChange={onNodeDataChange} />
  </div>
);
