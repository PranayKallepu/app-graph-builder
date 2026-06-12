import { useEffect } from "react";
import { useReactFlow } from "@xyflow/react";

import { useGraphStore } from "@/store/useGraphStore";
import type { ServiceEdge, ServiceNode } from "@/types/graph";

interface FitViewHandlerProps {
  nodes: ServiceNode[];
}

export const FitViewHandler = ({ nodes }: FitViewHandlerProps) => {
  const fitViewTrigger = useGraphStore((state) => state.fitViewTrigger);
  const { fitView } = useReactFlow<ServiceNode, ServiceEdge>();
  const nodeSignature = nodes.map((node) => node.id).join("|");

  useEffect(() => {
    if (nodes.length === 0) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      void fitView({ duration: 350, padding: 0.22 });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [fitView, nodeSignature, nodes.length]);

  useEffect(() => {
    if (fitViewTrigger === 0 || nodes.length === 0) {
      return;
    }

    void fitView({ duration: 350, padding: 0.22 });
  }, [fitView, fitViewTrigger, nodes.length]);

  return null;
};
