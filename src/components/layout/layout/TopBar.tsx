import { Menu, PanelRight, Search, ScanSearch } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppStore } from "@/store/useAppStore";
import { useGraphStore } from "@/store/useGraphStore";

export const TopBar = () => {
  const setMobilePanelOpen = useAppStore((state) => state.setMobilePanelOpen);
  const triggerFitView = useGraphStore((state) => state.triggerFitView);

  return (
    <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background/95 px-3 backdrop-blur md:px-5">
      <Button
        className="lg:hidden"
        size="icon"
        variant="ghost"
        title="Open navigation and inspector"
        onClick={() => setMobilePanelOpen(true)}
      >
        <Menu className="size-5" />
      </Button>
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-base font-semibold tracking-normal md:text-lg">App Graph Builder</h1>
      </div>
      <div className="relative hidden w-full max-w-sm md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input className="pl-9" placeholder="Search services" />
      </div>
      <Button size="icon" variant="outline" title="Fit view" onClick={triggerFitView}>
        <ScanSearch className="size-4" />
      </Button>
      <Button
        size="icon"
        variant="outline"
        title="Open inspector"
        onClick={() => setMobilePanelOpen(true)}
      >
        <PanelRight className="size-4" />
      </Button>
    </header>
  );
};
