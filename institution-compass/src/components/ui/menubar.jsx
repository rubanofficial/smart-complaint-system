import * as React from "react";
import * as MenubarPrimitive from "@radix-ui/react-menubar";
import { Check, ChevronRight, Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const Menubar = React.forwardRef(({ className, ...props }, ref) => (
  <MenubarPrimitive.Root
    ref={ref}
    className={cn(
      "flex h-10 items-center space-x-1 rounded-md border bg-background p-1",
      className
    )}
    {...props}
  />
));
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef(
  ({ className, ...props }, ref) => (
    <MenubarPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex cursor-default items-center rounded-sm px-3 py-1.5 text-sm font-medium focus:bg-accent",
        className
      )}
      {...props}
    />
  )
);
MenubarTrigger.displayName =
  MenubarPrimitive.Trigger.displayName;

export {
  Menubar,
  MenubarTrigger,
  MenubarPrimitive as MenubarMenu,
};
