import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import MobileNavigation from "./MobileNavigation";
import UserNavigation from "./UserNavigation";
import AuthNavigation from "./AuthNavigation";
import { auth } from "@/auth";

const MobileMenu = async () => {
  const session = await auth();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="cursor-pointer md:hidden" aria-label="Menu">
          <MenuIcon className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"right"} className="w-2/3">
        <SheetHeader className="mt-10 px-4">
          <SheetTitle className="sr-only">Menu Items</SheetTitle>
          <MobileNavigation />
        </SheetHeader>
        <SheetFooter className="border-t shadow">
          {session?.user ? <UserNavigation user={session?.user} /> : <AuthNavigation />}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
