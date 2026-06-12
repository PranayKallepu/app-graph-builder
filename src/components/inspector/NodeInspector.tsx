import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ConfigTab } from "@/components/inspector/ConfigTab";
import { RuntimeTab } from "@/components/inspector/RuntimeTab";
import { StatusBadge } from "@/components/inspector/StatusBadge";
import { useGraphStore } from "@/store/useGraphStore";
import type { InspectorTab, ServiceNode, ServiceNodeData } from "@/types/graph";

interface NodeInspectorProps {
  node: ServiceNode | null;
  onNodeDataChange: (nodeId: string, updates: Partial<ServiceNodeData>) => void;
}

export const NodeInspector = ({ node, onNodeDataChange }: NodeInspectorProps) => {
  const activeInspectorTab = useGraphStore((state) => state.activeInspectorTab);
  const setActiveInspectorTab = useGraphStore((state) => state.setActiveInspectorTab);

  if (!node) {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center rounded-lg border border-dashed border-border px-6 text-center">
        <p className="text-sm font-medium text-foreground">No node selected</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Select a service on the canvas to inspect configuration and runtime values.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{node.data.label}</p>
          <p className="mt-1 text-xs text-muted-foreground">{node.id}</p>
        </div>
        <StatusBadge status={node.data.status} />
      </div>
      <Tabs
        value={activeInspectorTab}
        onValueChange={(value) => setActiveInspectorTab(value as InspectorTab)}
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="config">Config</TabsTrigger>
          <TabsTrigger value="runtime">Runtime</TabsTrigger>
        </TabsList>
        <TabsContent value="config">
          <ConfigTab data={node.data} onChange={(updates) => onNodeDataChange(node.id, updates)} />
        </TabsContent>
        <TabsContent value="runtime">
          <RuntimeTab data={node.data} onChange={(updates) => onNodeDataChange(node.id, updates)} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
