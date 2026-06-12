import { create } from "zustand";

import type { InspectorTab } from "@/types/graph";

interface GraphStore {
  selectedNodeId: string | null;
  activeInspectorTab: InspectorTab;
  fitViewTrigger: number;
  setSelectedNodeId: (nodeId: string | null) => void;
  setActiveInspectorTab: (tab: InspectorTab) => void;
  triggerFitView: () => void;
}

export const useGraphStore = create<GraphStore>((set) => ({
  selectedNodeId: null,
  activeInspectorTab: "config",
  fitViewTrigger: 0,
  setSelectedNodeId: (selectedNodeId) => set({ selectedNodeId }),
  setActiveInspectorTab: (activeInspectorTab) => set({ activeInspectorTab }),
  triggerFitView: () => set((state) => ({ fitViewTrigger: state.fitViewTrigger + 1 }))
}));
