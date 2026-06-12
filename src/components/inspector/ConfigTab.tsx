import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ServiceNodeData } from "@/types/graph";

interface ConfigTabProps {
  data: ServiceNodeData;
  onChange: (updates: Partial<ServiceNodeData>) => void;
}

export const ConfigTab = ({ data, onChange }: ConfigTabProps) => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Label htmlFor="node-name">Node Name</Label>
      <Input
        id="node-name"
        value={data.label}
        onChange={(event) => onChange({ label: event.target.value })}
      />
    </div>
    <div className="space-y-2">
      <Label htmlFor="node-description">Description</Label>
      <Textarea
        id="node-description"
        value={data.description}
        onChange={(event) => onChange({ description: event.target.value })}
      />
    </div>
  </div>
);
