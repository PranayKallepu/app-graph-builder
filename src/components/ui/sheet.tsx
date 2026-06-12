import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ComponentPropsWithoutRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Sheet = DialogPrimitive.Root;
export const SheetTrigger = DialogPrimitive.Trigger;
export const SheetClose = DialogPrimitive.Close;

export const SheetContent = ({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof DialogPrimitive.Content>) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm data-[state=closed]:animate-out data-[state=open]:animate-in" />
    <DialogPrimitive.Content
      className={cn(
        "fixed inset-y-0 right-0 z-50 flex w-full max-w-[420px] flex-col border-l border-border bg-background shadow-glow outline-none",
        className
      )}
      {...props}
    >
      <div className="flex h-14 items-center justify-between border-b border-border px-4">
        <DialogPrimitive.Title className="text-sm font-semibold">Inspector</DialogPrimitive.Title>
        <DialogPrimitive.Description className="sr-only">
          Application selection and node inspector
        </DialogPrimitive.Description>
        <SheetClose asChild>
          <Button size="icon" variant="ghost" title="Close inspector">
            <X className="size-4" />
          </Button>
        </SheetClose>
      </div>
      {children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);
