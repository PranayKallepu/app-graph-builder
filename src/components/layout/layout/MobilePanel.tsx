import { ApplicationsList } from "@/components/layout/components/ApplicationsList";
import { NodeInspector } from "@/components/inspector/NodeInspector";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useAppStore } from "@/store/useAppStore";
import type { ServiceNode, ServiceNodeData } from "@/types/graph";

interface MobilePanelProps {
  selectedNode: ServiceNode | null;
  onNodeDataChange: (nodeId: string, updates: Partial<ServiceNodeData>) => void;
}

export const MobilePanel = ({ selectedNode, onNodeDataChange }: MobilePanelProps) => {
  const mobilePanelOpen = useAppStore((state) => state.mobilePanelOpen);
  const setMobilePanelOpen = useAppStore((state) => state.setMobilePanelOpen);

  return (
    <Sheet open={mobilePanelOpen} onOpenChange={setMobilePanelOpen}>
      <SheetContent>
        <div className="scrollbar-thin flex-1 space-y-6 overflow-y-auto p-4">
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
      </SheetContent>
    </Sheet>
  );
};
