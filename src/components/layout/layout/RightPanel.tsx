import { ApplicationsList } from "@/components/layout/components/ApplicationsList";
import { NodeInspector } from "@/components/inspector/NodeInspector";
import type { ServiceNode, ServiceNodeData } from "@/types/graph";

interface RightPanelProps {
  selectedNode: ServiceNode | null;
  onNodeDataChange: (nodeId: string, updates: Partial<ServiceNodeData>) => void;
}

export const RightPanel = ({ selectedNode, onNodeDataChange }: RightPanelProps) => (
  <aside className="hidden w-80 shrink-0 overflow-y-auto border-l border-border bg-background/90 p-4 lg:block">
    <div className="space-y-6">
      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Applications
        </h2>
        <ApplicationsList />
      </section>
      <section className="space-y-3">
        <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Inspector
        </h2>
        <NodeInspector node={selectedNode} onNodeDataChange={onNodeDataChange} />
      </section>
    </div>
  </aside>
);
