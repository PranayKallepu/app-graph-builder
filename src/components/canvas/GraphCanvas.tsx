import {
  Background,
  BackgroundVariant,
  Controls,
  MarkerType,
  ReactFlow,
  type NodeTypes,
  type OnEdgesChange,
  type OnNodesChange
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { RefreshCcw } from "lucide-react";
import { useMemo } from "react";

import { FitViewHandler } from "@/components/canvas/FitViewHandler";
import { ServiceNode } from "@/components/canvas/ServiceNode";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/useAppStore";
import { useGraphStore } from "@/store/useGraphStore";
import type { ServiceEdge, ServiceNode as ServiceNodeType } from "@/types/graph";

interface GraphCanvasProps {
  nodes: ServiceNodeType[];
  edges: ServiceEdge[];
  loading: boolean;
  error: Error | null;
  onNodesChange: OnNodesChange<ServiceNodeType>;
  onEdgesChange: OnEdgesChange<ServiceEdge>;
  onRetry: () => void;
}

export const GraphCanvas = ({
  nodes,
  edges,
  loading,
  error,
  onEdgesChange,
  onNodesChange,
  onRetry
}: GraphCanvasProps) => {
  const setMobilePanelOpen = useAppStore((state) => state.setMobilePanelOpen);
  const selectedNodeId = useGraphStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useGraphStore((state) => state.setSelectedNodeId);
  const nodeTypes = useMemo<NodeTypes>(() => ({ service: ServiceNode }), []);

  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center bg-background">
        <div className="size-10 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-1 items-center justify-center bg-background p-6 text-center">
        <div className="max-w-sm space-y-4">
          <div>
            <p className="text-sm font-semibold">Graph failed to load</p>
            <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
          </div>
          <Button variant="outline" onClick={onRetry}>
            <RefreshCcw className="size-4" />
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex-1 bg-background">
      <ReactFlow<ServiceNodeType, ServiceEdge>
        className="app-graph-flow"
        defaultEdgeOptions={{
          markerEnd: { type: MarkerType.ArrowClosed },
          style: { strokeWidth: 2 }
        }}
        deleteKeyCode={["Delete", "Backspace"]}
        edges={edges}
        fitView
        nodeTypes={nodeTypes}
        nodes={nodes.map((node) => ({
          ...node,
          selected: node.id === selectedNodeId
        }))}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => {
          setSelectedNodeId(node.id);
          if (window.matchMedia("(max-width: 1023px)").matches) {
            setMobilePanelOpen(true);
          }
        }}
        onNodesChange={onNodesChange}
        onNodesDelete={(deletedNodes) => {
          if (deletedNodes.some((node) => node.id === selectedNodeId)) {
            setSelectedNodeId(null);
          }
        }}
      >
        <Background color="hsl(var(--border))" gap={20} size={1.4} variant={BackgroundVariant.Dots} />
        <Controls className="!border-border !bg-card !shadow-glow [&_button]:!border-border [&_button]:!bg-card [&_button_svg]:!fill-foreground" />
        <FitViewHandler nodes={nodes} />
      </ReactFlow>
    </div>
  );
};
