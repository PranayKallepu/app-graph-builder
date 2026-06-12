import { ReactFlowProvider, useEdgesState, useNodesState } from "@xyflow/react";
import { useEffect, useMemo } from "react";

import { AppLayout } from "@/components/layout/layout/AppLayout";
import { useGraph } from "@/hooks/useGraph";
import { useAppStore } from "@/store/useAppStore";
import { useGraphStore } from "@/store/useGraphStore";
import type { ServiceEdge, ServiceNode, ServiceNodeData } from "@/types/graph";

const cloneNodes = (nodes: ServiceNode[]): ServiceNode[] =>
  nodes.map((node) => ({
    ...node,
    data: { ...node.data },
    position: { ...node.position }
  }));

const cloneEdges = (edges: ServiceEdge[]): ServiceEdge[] =>
  edges.map((edge) => ({
    ...edge,
    style: edge.style ? { ...edge.style } : undefined
  }));

export const Dashboard = () => {
  const selectedAppId = useAppStore((state) => state.selectedAppId);
  const selectedNodeId = useGraphStore((state) => state.selectedNodeId);
  const setSelectedNodeId = useGraphStore((state) => state.setSelectedNodeId);
  const graphQuery = useGraph(selectedAppId);
  const [nodes, setNodes, onNodesChange] = useNodesState<ServiceNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<ServiceEdge>([]);

  useEffect(() => {
    setSelectedNodeId(null);
  }, [selectedAppId, setSelectedNodeId]);

  useEffect(() => {
    if (!graphQuery.data) {
      return;
    }

    setNodes(cloneNodes(graphQuery.data.nodes));
    setEdges(cloneEdges(graphQuery.data.edges));
  }, [graphQuery.data, setEdges, setNodes]);

  const selectedNode = useMemo(
    () => nodes.find((node) => node.id === selectedNodeId) ?? null,
    [nodes, selectedNodeId]
  );

  const updateNodeData = (nodeId: string, updates: Partial<ServiceNodeData>) => {
    setNodes((currentNodes) =>
      currentNodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...updates } } : node
      )
    );
  };

  return (
    <ReactFlowProvider>
      <AppLayout
        edges={edges}
        graphError={graphQuery.error}
        graphLoading={graphQuery.isLoading}
        nodes={nodes}
        selectedNode={selectedNode}
        onEdgesChange={onEdgesChange}
        onGraphRetry={() => void graphQuery.refetch()}
        onNodeDataChange={updateNodeData}
        onNodesChange={onNodesChange}
      />
    </ReactFlowProvider>
  );
};
