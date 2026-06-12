import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import type { ServiceNodeData } from "@/types/graph";

const clampMetric = (value: number) => Math.min(100, Math.max(0, value));

interface RuntimeTabProps {
  data: ServiceNodeData;
  onChange: (updates: Partial<ServiceNodeData>) => void;
}

export const RuntimeTab = ({ data, onChange }: RuntimeTabProps) => {
  const setMetric = (value: number) => onChange({ metric: clampMetric(value) });

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="runtime-metric">Runtime Metric</Label>
          <span className="text-xs text-muted-foreground">{data.metric}%</span>
        </div>
        <Slider
          max={100}
          min={0}
          step={1}
          value={[data.metric]}
          onValueChange={([value]) => setMetric(value ?? 0)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="runtime-metric">Numeric Value</Label>
        <Input
          id="runtime-metric"
          inputMode="numeric"
          max={100}
          min={0}
          type="number"
          value={data.metric}
          onChange={(event) => setMetric(Number(event.target.value))}
        />
      </div>
    </div>
  );
};
