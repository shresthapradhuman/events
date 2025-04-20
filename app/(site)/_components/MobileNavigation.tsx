"use client";
import { SheetClose } from "@/components/ui/sheet";
import React from "react";
import { navigationItems } from "@/constant";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const MobileNavigation = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col">
      {navigationItems.map(({ label, path }, key) => (
        <SheetClose asChild key={key}>
          <Link
            href={path}
            className={cn(
              "flex items-center rounded-md px-4 py-3 text-base font-medium hover:bg-muted",
              {
                "bg-accent text-accent-foreground":
                  pathname == path || pathname?.startsWith(`${path}/`),
              },
            )}
          >
            {label}
          </Link>
        </SheetClose>
      ))}
    </div>
  );
};

export default MobileNavigation;
