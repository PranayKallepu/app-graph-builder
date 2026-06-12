import { Box, Database, Github, Server, Workflow } from "lucide-react";

import { Button } from "@/components/ui/button";

const railItems = [
  { label: "GitHub", icon: Github },
  { label: "Database", icon: Database },
  { label: "Server", icon: Server },
  { label: "Workflow", icon: Workflow },
  { label: "Boxes", icon: Box }
];

export const LeftRail = () => (
  <aside className="hidden w-16 shrink-0 flex-col items-center gap-3 border-r border-border bg-background/90 py-4 lg:flex">
    {railItems.map(({ icon: Icon, label }) => (
      <Button key={label} size="icon" variant="ghost" title={label}>
        <Icon className="size-5" />
      </Button>
    ))}
  </aside>
);
