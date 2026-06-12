import type { ServiceStatus } from "@/types/graph";
import { cn } from "@/lib/utils";

const statusClasses: Record<ServiceStatus, string> = {
  Healthy: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  Degraded: "border-yellow-400/30 bg-yellow-400/10 text-yellow-300",
  Down: "border-red-400/30 bg-red-400/10 text-red-300"
};

interface StatusBadgeProps {
  status: ServiceStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => (
  <span
    className={cn(
      "inline-flex items-center rounded-full border px-2 py-0.5 text-[11px] font-semibold",
      statusClasses[status]
    )}
  >
    {status}
  </span>
);
